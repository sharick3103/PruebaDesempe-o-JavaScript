import { removeSession, isAdmin } from "@/utils";
import { navigateTo } from "@/router/router";

export default function Sidebar() {
  setTimeout(() => {
    document
      .querySelector("#logoutBtn")
      ?.addEventListener("click", () => {

        removeSession();
        navigateTo("/");
      });
  });

  return `
    <aside
      class="w-64 bg-slate-900 text-white h-screen p-5 flex flex-col"
    >
      <h2 class="text-2xl font-bold mb-8">
        SpaceBook
      </h2>

      <nav class="flex flex-col gap-2 flex-1">

        <a
          href="/home"
          class="px-3 py-2 bg-slate-700 hover:bg-slate-600 rounded-xl transition"
          data-link
        >
           Inicio
        </a>

        ${
          isAdmin()
            ? `<a
                href="/reservations"
                class="px-3 py-2 hover:bg-slate-700 rounded-xl transition"
                data-link
              >
                Todas las Reservas
              </a>`
            : ""
        }

        <a
          href="/my-reservations"
          class="px-3 py-2 hover:bg-slate-700 rounded-xl transition"
          data-link
        >
          Mis Reservas
        </a>

        <a
          href="/new-reservation"
          class="px-3 py-2 hover:bg-slate-700 rounded-xl transition"
          data-link
        >
           Nueva Reserva
        </a>

      </nav>

      <button
        id="logoutBtn"
        class="text-left cursor-pointer text-red-400 hover:text-white hover:bg-red-500 px-3 py-2 rounded-xl transition mt-auto"
      >
         Cerrar sesión
      </button>

    </aside>
  `;
}
