import Sidebar from '@/components/Sidebar';
import { getSession } from '@/utils';
import { homeController } from '@/controllers/home.controller';

export default function homeView() {
  const user = getSession();
  const isAdmin = user?.role === 'admin';
  
  setTimeout(() => { homeController(); }, 0);

  return `
    <div style="display: flex; font-family: sans-serif; color: #000; background: #fff; min-height: 100vh;">
      ${Sidebar()}
      
      <main style="flex: 1; padding: 20px;">
    
        <div style="margin-bottom: 20px;">
          <h1 style="font-size: 24px; margin: 0;">Hola, ${user?.name || 'Usuario'}</h1>
          <p style="color: #666; margin: 5px 0 0 0;">
            Rol: <span style="font-weight: bold; color: ${isAdmin ? '#900' : '#000'}">${user?.role || 'user'}</span>
          </p>
        </div>

        <div style="padding: 15px; background: #f5f5f5; border: 1px solid #ccc; margin-bottom: 20px;">
          <h2 style="font-size: 18px; margin: 0 0 5px 0; color: ${isAdmin ? '#900' : '#000'}">
            ${isAdmin ? 'Panel de Control: Admin' : 'Panel de Control: Usuario'}
          </h2>
          <p style="margin: 0; font-size: 14px; color: #992828;">
            ${isAdmin ? 'Acceso total a todas las reservas.' : 'Solo puedes ver tus propias reservas.'}
          </p>
        </div>

        <div>
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #000; padding-bottom: 5px; margin-bottom: 15px;">
            <h2 style="font-size: 20px; margin: 0;">Reservas</h2>
            <span style="font-size: 12px; color: #666;">
              ${isAdmin ? 'Viendo todo' : 'Viendo las tuyas'}
            </span>
          </div>
         
          <div id="reservationsContainer">
            <p style="color: #666;">Cargando lista...</p>
          </div>
        </div>
      </main>
    </div>
  `;
}
