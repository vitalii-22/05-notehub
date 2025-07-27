import { useEffect, useState } from "react";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useDebouncedCallback } from "use-debounce";

import css from "./App.module.css";
import { fetchNotes } from "../../services/noteService";
import NoteList from "../NoteList/NoteList";
import Pagination from "../Pagination/Pagination";
import Modal from "../Modal/Modal";
import NoteForm from "../NoteForm/NoteForm";
import SearchBox from "../SearchBox/SearchBox";
import toast, { Toaster } from "react-hot-toast";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
console.log("TOKEN:", import.meta.env.VITE_NOTEHUB_TOKEN);

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["notes", currentPage, searchQuery],
    queryFn: () => fetchNotes(currentPage, searchQuery),
    placeholderData: keepPreviousData,
  });

  const totalPages = data?.totalPages ?? 0;

  const updateSearchQuery = useDebouncedCallback((query) => {
    setCurrentPage(1);
    setSearchQuery(query);
  }, 1000);

  useEffect(() => {
    if (data && data.notes.length === 0) {
      toast.error("No notes found for your request");
    }
  }, [data]);

  return (
    <>
      <div className={css.app}>
        <header className={css.toolbar}>
          <SearchBox value={searchQuery} onSearch={updateSearchQuery} />
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
      <Toaster position="top-right" />
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
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
