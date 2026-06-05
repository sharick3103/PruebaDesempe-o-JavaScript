import { loginController } from "@/controllers/login.controller";

export default function loginView() {
  setTimeout(() => {
    loginController();
  });

  return `
    <div class="min-h-screen flex justify-center items-center bg-gradient-to-br from-slate-800 to-slate-900">

      <div class="bg-white p-8 rounded-2xl shadow-xl w-96">

        <div class="text-center mb-6">
          <h1 class="text-3xl font-bold text-slate-800">Login</h1>
      
        </div>
        <div
          id="loginError"
          class="hidden bg-red-50 border border-red-300 text-red-700 text-sm px-4 py-2 rounded mb-4"
        ></div>

        <form id="loginForm" class="flex flex-col gap-4">

          <div>
            <label class="block text-sm font-medium text-slate-700 mb-1">
              Correo electrónico
            </label>
            <input
              type="email"
              name="email"
              placeholder="correo"
              class="border border-slate-300 w-full p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
          </div>

          <div>
            <label class="block text-sm font-medium text-slate-700 mb-1">
              Contraseña
            </label>
            <input
              type="password"
              name="password"
              placeholder="contraseña"
              class="border border-slate-300 w-full p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
          </div>

          <button
            type="submit"
            class="bg-blue-600 hover:bg-blue-700 text-white w-full py-2 rounded-lg font-semibold transition"
          >
            Ingresar
          </button>

        </form>

      </div>

    </div>
  `;
}
