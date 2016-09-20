export default function (nga, admin) {
    return nga.dashboard()
    .template(`
      <div class="wrapper" style="text-align: center; padding: 20px;">
          <h1 style="text-align: center">Bienvenido a tu administrador de AZ Club!</h1>
          <div class="row" style="overflow: hidden;">
              <div class="col-md-6 merquita" style="position: relative;">
                  <h2>¿Como cargo por primera vez los datos de mi negocio ?</h2>
                  <h4>En este video podras ver de manera muy sencilla como completar los datos de tu negocio para mostrarlos en tu perfil Premium y en tu propia pagina web AZ Club</h4>
                  <div style="position: absolute; top: 200px; width: 100%; height: auto">
                      <iframe width="90%" height="350" src="https://www.youtube.com/embed/jwPO1SJnG-E?autoplay=0">
                      </iframe>
                  </div>
              </div>
              <div class="col-md-6 merquita" style="position: relative;">
                  <h2>¿Como crear promociones y destacados de mi negocio?</h2>
                  <h4>Aquí encontraras como crear o subir banner con novedades para toda la comunidad de AZ Club y redes sociales.
      ¿no tenes un diseñador para crear promociones ? NO IMPORTA! AZ Club lo hace por vos <strong>GRATIS</strong>.</h4>
                  <div style="position: absolute; top: 200px; width: 100%; height: auto">
                      <iframe width="90%" height="350" src="https://www.youtube.com/embed/PqTu_pFbAOE?autoplay=0">
                      </iframe>
                  </div>
              </div>
              <div class="col-md-6 merquita"position: relative;">
                  <h2>¿Como elijo y personalizo mi propia pagina web ? ¿Y en la APP?</h2>
                  <h4>Mira en este video lo facil que es cambiar las imagenes y fotos de tu trabajo, el logo de tu empresa o el diseño de tu pagina web. Recorda que podes cambiar todas la veces que quieras el formato de tu pagina web sin costos adicionales. Y tranquilo ! todo se replica automaticamente en la APP</h4>
                  <div style="position: absolute; top: 200px; width: 100%; height: auto">
                      <iframe width="90%" height="350" src="https://www.youtube.com/embed/AqgayvBWxqo?autoplay=0">
                      </iframe>
                  </div>
              </div>
              <div class="col-md-6 merquita"position: relative;">
                  <h2>¿Como hago para que encuentren mi negocio por cercania?</h2>
                  <h4>Este paso es tan importante como sensillo. Aqui podras ver como Geolocalizar tu local y permitir que los clientes te encuentren por cercania. Deberas introducir una direccion real, sin abreviaturas ni simbolos. MIRA!</h4>
                  <div style="position: absolute; top: 200px; width: 100%; height: auto">
                      <iframe width="90%" height="350" src="https://www.youtube.com/embed/b_vFbP0QnHw?autoplay=0">
                      </iframe>
                  </div>
              </div>
              <div class="col-md-6 merquita"position: relative;">
                  <h2>¿Como usar la mensajeria ? ¿Que son los clientes favoritos?</h2>
                  <h4>En este video podras ver como utilizar la mensajeria directa con tus clientes y proveedores, Selecciona tus clientes favoritos para poder destacarlos y listarlos, para luego poder enviar promociones especiales o tomar pedidos de confianza.
      </h4>
                  <div style="position: absolute; top: 200px; width: 100%; height: auto">
                      <iframe width="90%" height="350" src="https://www.youtube.com/embed/3R4vtNyz96M?autoplay=0">
                      </iframe>
                  </div>
              </div>
              <div class="col-md-6 merquita"position: relative;">
                  <h2>¿Como funciona AZ Club para mi negocio?</h2>
                  <h4>Descubri las ventajas que AZ Club tiene para vos ! No te quedes afuera, el futuro nos espera
      </h4>
                  <div style="position: absolute; top: 200px; width: 100%; height: auto">
                      <iframe width="90%" height="350" src="https://www.youtube.com/embed/ZJ0e-Pe4kaM?autoplay=0">
                      </iframe>
                  </div>
              </div>

          </div>
      </div>
      `);
}
