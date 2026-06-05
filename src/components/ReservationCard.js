import { isAdmin, getSession } from "@/utils";

export default function ReservationCard(reservation) {
  const { id, userId, workspace, date, startHour, endHour, reason, status } = reservation;
  const user = getSession();

  const statusColors = {
    pending:  "bg-yellow-100 text-yellow-800",
    approved: "bg-green-100 text-green-800",
    rejected: "bg-red-100 text-red-800",
    cancelled: "bg-slate-100 text-slate-600",
  };

  const statusLabels = {
    pending:   "Pendiente",
    approved:  "Aprobada",
    rejected:  "Rechazada",
    cancelled: "Cancelada",
  };

  const colorClass = statusColors[status] || "bg-slate-100 text-slate-600";
  const label      = statusLabels[status]  || status;

 
  const isOwner   = user?.id === userId;
  const canEdit   = isAdmin() || (isOwner && status === "pending");
  const canDelete = isAdmin();
  const canApprove   = isAdmin() && status === "pending";
  const canCancel    = isOwner && (status === "pending" || status === "approved");

  return `
    <article
      class="bg-white border border-slate-200 rounded-lg p-4 shadow-sm flex flex-col gap-2"
      data-id="${id}"
    >
      <div class="flex justify-between items-start">
        <h3 class="font-bold text-lg text-slate-800">${workspace}</h3>
        <span class="text-xs px-2 py-1 rounded-full font-medium ${colorClass}">
          ${label}
        </span>
      </div>

      <div class="text-sm text-slate-600 space-y-1">
        <p> <span class="font-medium">Fecha:</span> ${date}</p>
        <p> <span class="font-medium">Horario:</span> ${startHour} - ${endHour}</p>
        <p> <span class="font-medium">Motivo:</span> ${reason}</p>
      </div>

      <div class="flex gap-2 flex-wrap mt-2">

        ${canApprove ? `
          <button
            class="btn-approve text-xs bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded transition"
            data-id="${id}"
          >
            ✔ Aprobar
          </button>
          <button
            class="btn-reject text-xs bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition"
            data-id="${id}"
          >
            ✘ Rechazar
          </button>
        ` : ""}

        ${canEdit ? `
          <button
            class="btn-edit text-xs bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded transition"
            data-id="${id}"
          >
            ✏ Editar
          </button>
        ` : ""}

        ${canCancel && !isAdmin() ? `
          <button
            class="btn-cancel text-xs bg-orange-400 hover:bg-orange-500 text-white px-3 py-1 rounded transition"
            data-id="${id}"
          >
            ✖ Cancelar
          </button>
        ` : ""}

        ${canDelete ? `
          <button
            class="btn-delete text-xs bg-slate-400 hover:bg-slate-500 text-white px-3 py-1 rounded transition"
            data-id="${id}"
          >
             Eliminar
          </button>
        ` : ""}

      </div>
    </article>
  `;
}
