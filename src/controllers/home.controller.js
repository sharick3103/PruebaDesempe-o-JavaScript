import ReservationCard from "@/components/ReservationCard";
import {
  getReservations,
  patchReservation,
  deleteReservation,
} from "@/services/reservation.service";
import { getSession } from "@/utils";
import { navigateTo } from "@/router/router";

export const homeController = async () => {
  const container = document.querySelector("#reservationsContainer");
  const user = getSession();

  try {
    const reservations = await getReservations();


    const filtered =
      user.role === "admin"
        ? reservations
        : reservations.filter((r) => r.userId === user.id);

    container.innerHTML = filtered.length
      ? filtered.map((r) => ReservationCard(r)).join("")
      : `<div class="w-full text-center py-8 col-span-2">
           <p class="text-slate-400">No hay reservas disponibles</p>
         </div>`;

   
    container.addEventListener("click", async (e) => {
      const btn = e.target.closest("button");
      if (!btn) return;

      const id = Number(btn.dataset.id);

    
      if (btn.classList.contains("btn-approve")) {
        await patchReservation(id, { status: "approved" });
        homeController();
      }

      if (btn.classList.contains("btn-reject")) {
        await patchReservation(id, { status: "rejected" });
        homeController();
      }

      if (btn.classList.contains("btn-cancel")) {
        await patchReservation(id, { status: "cancelled" });
        homeController();
      }

      if (btn.classList.contains("btn-delete")) {
        if (confirm("¿Eliminar esta reserva?")) {
          await deleteReservation(id);
          homeController();
        }
      }

  
      if (btn.classList.contains("btn-edit")) {
        navigateTo(`/edit-reservation?id=${id}`);
      }
    });

  } catch (error) {
    console.error("Error cargando reservas:", error);
    container.innerHTML = `
      <div class="w-full text-center py-8 col-span-2">
        <p class="text-red-400">Error al cargar las reservas. ¿Está corriendo json-server?</p>
      </div>`;
  }
};
