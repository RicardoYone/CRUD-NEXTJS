"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function NewPage({ params }) {
  // console.log(params);
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (!params.id) return;
    fetch(`/api/tasks/${params.id}`)
      .then((res) => res.json())
      .then((data) => {
        setTitle(data.title);
        setDescription(data.description);
        // console.log(data);
      });
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    // const { title, description } = e.target.elements.value;

    // const title = e.target.title.value;
    // const description = e.target.description.value;

    // console.log(title, description);

    if (params.id) {
      await fetch(`/api/tasks/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          console.log("updating");
        });
      router.refresh();
      router.push("/");
    } else {
      console.log("create");
      await fetch("/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description }),
      }).then((res) => res.json());
      // .then((data) => {
      //   console.log(data);
      // });
      router.push("/");
    }
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <form onSubmit={onSubmit} className="bg-slate-800 p-10 w-3/4 ">
        <label htmlFor="title" className="font-bold text-sm">
          Titulo de la tarea
        </label>
        <input
          type="text"
          name="title"
          id="title"
          placeholder="Title"
          className="border border-gray-400 p-2 mb-4 w-full text-black"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <label htmlFor="descripcion" className="font-bold text-sm">
          Descripcion de la tarea
        </label>
        <textarea
          name=""
          id="description"
          cols="30"
          rows="10"
          placeholder="Description"
          className="border border-gray-400 p-2 mb-4 w-full text-black"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        ></textarea>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full">
          Crear
        </button>
        {params.id && (
          <button
            type="button"
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-full mt-4"
            onClick={async () => {
              const data = await fetch(`/api/tasks/${params.id}`, {
                method: "DELETE",
              });
              console.log(data);
              router.refresh();
              router.push("/");
            }}
          >
            Eliminar
          </button>
        )}
      </form>
    </div>
  );
}

export default NewPage;
