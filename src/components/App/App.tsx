import { useEffect, useState } from "react";
import { Formik } from "formik";

import { keepPreviousData, useQuery } from "@tanstack/react-query";

import css from "./App.module.css";
import type { Note } from "../../types/note";
import { fetchNotes } from "../../services/noteService";
import NoteList from "../NoteList/NoteList";
import ReactPaginate from "react-paginate";
import Pagination from "../Pagination/Pagination";
import Modal from "../Modal/Modal";
import NoteForm from "../NoteForm/NoteForm";

function App() {
  // const [notes, setNotes] = useState<Note | null>(null);
  const [noteName, setNoteName] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["notes", currentPage],
    queryFn: () => fetchNotes(currentPage),
  });

  const totalPages = data?.totalPages ?? 0;

  return (
    <>
      <div className={css.app}>
        <header className={css.toolbar}>
          {/* Компонент SearchBox */}
          {isSuccess && totalPages > 1 && (
            <Pagination
              totalPages={totalPages}
              onCurrentPage={setCurrentPage}
              currentPage={currentPage}
            />
          )}
          <button onClick={openModal} className={css.button}>
            Create note +
          </button>
        </header>
      </div>
      {isSuccess && data !== undefined && data.notes.length > 0 && (
        <NoteList notes={data.notes} />
      )}
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <NoteForm onClose={closeModal} />
        </Modal>
      )}
    </>
  );
}

export default App;
