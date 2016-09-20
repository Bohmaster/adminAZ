export default function (nga, admin) {

  var Categories = nga.entity('categories');
  var Cities = nga.entity('cities');
  var Tags = nga.entity('tags');

  var entityId = JSON.parse(localStorage.getItem('az_admin_user')).entityId;

  // Definiendo la entidad como perfil de este usuario Owner
  var Entity = admin.getEntity('entities').url(function(entityName, viewType, identifierValue, identifierName) {
    return 'entities/' + entityId;
  });

  Entity.editionView()
  .fields([

    nga.field('submit', 'template')
    .template('<input class="btn btn-info button-submit-form" type="submit" value="Guardar cambios" ng-click="formController.submitEdition($event)">',true),

    nga.field('dummy').label('').template('<h3>Información básica:</h3>'),
    nga.field('name').label('Nombre'),
    nga.field('description', 'text').label('Quiénes somos'),
    nga.field('shortTimeDesc').attributes({ placeholder: 'Máximo 40 caractéres' }).validation({ maxlength: 40 })
    .label('Dirección específica'),
    nga.field('dummy').label('').template('* agregar N º de local, esquina, piso, km de ser necesario'),
    // nga.field('shortTimeDesc').label('Descripción breve del horario (máximo 40 caractéres)'),
    // nga.field('dummy').label('').template('<h3>Ubicación en la app:</h3>'),
    // nga.field('dummy').label('').template('Seleccione los rubros correspondientes a su negocio.'),
    // nga.field('belongsToCategory', 'reference_many')
    // .label("Rubros")
    // .targetEntity(Categories)
    // .permanentFilters({ "has_entities": true })
    // .targetField(nga.field('name')),

    // nga.field('dummy').label('').template('<h3>Tags</h3>'),
    // nga.field('dummy').label('').template('Los Tags son palabras claves que sirven para que los usuarios encuentren tu negocio en una búsqueda específica. Elegí entre las existentes clickeando en el cuadro de abajo o crea vos mismo tus Tags.<br><br>Recomendación: Agrega tu barrio, calle, actividad y productos principales (recorda que deben ser sin símbolos, acentos o mayúsculas)'),
    //
    // nga.field('hasTags', 'reference_many')
    // .label("")
    // .perPage(10000)
    // .targetEntity(Tags)
    // .targetField(nga.field('name')),
    //
    // nga.field('tags', 'embedded_list') // Define a 1-N relationship with the (embedded) comment entity
    // .targetFields([ // which comment fields to display in the datagrid / form
    //     nga.field('name')
    // ]),
    //
    // nga.field('hasTags').label('').template('<add-new-tag entry="entry" datastore="datastore"></add-new-tag>'),

    nga.field('dummy').label('').template('<h3>Datos de contacto:</h3>'),
    nga.field('address').label('Ubicación por GPS'),
    nga.field('dummy').label('').template('Carga tu dirección o ubiacion geografica sin abreviaturas ni especificaciones para geolocalizar en google maps'),

    nga.field('cityId', 'reference').label('Ciudad')
    .targetEntity(Cities).targetField(nga.field('name')),

    nga.field('geoLocation', 'template')
    .label('Obtener Geo localización')
    .template('<geo></geo>'),

    nga.field('phone').label('Teléfono Fijo'),
    nga.field('mobile').label('Teléfono Celular'),
    nga.field('email').label('E-mail'),
    nga.field('website').label('Página Web'),
    nga.field('facebook').label('Facebook'),
    nga.field('twitter').label('Twitter'),
    nga.field('whatsapp').label('Whatsapp'),
    nga.field('instagram').label('Instagram'),

    nga.field('dummy').label('').template('<h3>Información Comercial:</h3>'),

    nga.field('dummy').label('Servicios').template('<services></services>'),
    nga.field('services', 'wysiwyg').stripTags(true).label(''),

    nga.field('dummy').label('').template('Elegí el tamaño, tipo y alineación del texto y personalizálo a tu manera'),
    nga.field('timeSheet','wysiwyg').label('Horarios'),

    nga.field('dummy').label('').template('Elegí el tamaño, tipo y alineación del texto y personalizálo a tu manera'),
    nga.field('productSheet','wysiwyg').label('Productos'),

    nga.field('dummy').label('Formas de pago').template('<payment></payment>'),
    nga.field('paymentSheet','wysiwyg').label(''),

    nga.field('dummy').label('').template('<h3>Imagenes:</h3>'),
    nga.field('dummy').label('').template('Consejo: las imágenes “logo de tu comercio” e “imagen de fondo APP” deben ser de baja resolución'),

    nga.field('logo', 'template')
    .label('Logo de tu comercio')
    .template('<entity-image target="logo"></entity-image>'),

    nga.field('cover', 'template')
    .label('Imagen de fondo APP')
    .template('<entity-image target="cover"></entity-image>'),

    nga.field('webcover', 'template')
    .label('Fondo de tu pagina web')
    .template('<entity-image target="webcover"></entity-image>'),

    nga.field('photos', 'template')
    .label('Fotos')
    .template('<entity-image target="photo" multi="true"></entity-image>'),

    nga.field('qrcode', 'template')
    .label('Codigo QR AFIP')
    .template('<entity-image target="qrcode"></entity-image>'),

    nga.field('dummy').label('').template('<h3>Datos de Sistema:</h3>'),
    nga.field('subdomain.name').label('Tu dominio .arg.az').editable(false),

    nga.field('template', 'choice')
    .defaultValue("uno")
    .attributes({ placeholder: 'Plantilla' })
    .choices([
      { value: 'uno', label: 'Plantilla 1' },
      { value: 'dos', label: 'Plantilla 2' },
      { value: 'tres', label: 'Plantilla 3' }
    ]).label('Diseño de pagina web')

  ])
  .actions([])
  .title('Información de tu perfil');

  return Entity;
}
