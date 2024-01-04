import { prisma } from "@/libs/prisma";
import TaskCard from "@/components/TaskCard";

async function loadTasks() {
  //haciendo una peticion http api/tasks (front y back separados)
  // const data = await fetch("http://localhost:3000/api/tasks").then((response) =>
  //   response.json()
  // );
  // console.log(data);
  // return data;

  //obteniendo de la base de datos directamente ( back y fron juntos estan en el mismo proyecto)
  // const tasks = await prisma.task.findMany();
  // console.log(tasks);
  // return tasks;
  return await prisma.task.findMany();
}

// export const revalidate = 60;
export const dynamic = "force-dynamic";

async function HomePage() {
  const tasks = await loadTasks();
  // console.log(tasks);

  return (
    <section className="container mx-auto">
      <div className="grid grid-cols-3 gap-3 mt-10">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </section>
  );
}

/* <TaskCard key={task.id} {...task} /> */ //otra forma de pasar los props si lo pasas asi ya no necesitas ponerle los {} en el componente TaskCard sino defrente task

export default HomePage;
