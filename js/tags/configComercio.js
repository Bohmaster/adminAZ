export default function (nga, admin) {

  var Categories = nga.entity('categories');
  var Cities = nga.entity('cities');
  var Tags = nga.entity('tags');

  var entityId = JSON.parse(localStorage.getItem('az_admin_user')).entityId;

  // Definiendo la entidad como perfil de este usuario Owner
  var EntityTags = admin.getEntity('entities').url(function(entityName, viewType, identifierValue, identifierName) {
    return 'entities/' + entityId;
  });

  EntityTags.editionView()
  .fields([

    nga.field('dummy').label('').template('<h3>Tags</h3>'),
    nga.field('dummy').label('').template('Los Tags son palabras claves que sirven para que los usuarios encuentren tu negocio en una búsqueda específica. Elegí entre las existentes clickeando en el cuadro de abajo o crea vos mismo tus Tags.<br><br>Recomendación: Agrega tu barrio, calle, actividad y productos principales (recorda que deben ser sin símbolos, acentos o mayúsculas)'),

    nga.field('hasTags', 'reference_many')
    .label("")
    .perPage(10000)
    .targetEntity(Tags)
    .targetField(nga.field('name')),

    nga.field('tags', 'embedded_list') // Define a 1-N relationship with the (embedded) comment entity
    .targetFields([ // which comment fields to display in the datagrid / form
        nga.field('name')
    ]),

    nga.field('hasTags').label('').template('<add-new-tag entry="entry" datastore="datastore"></add-new-tag>')

  ])
  .actions([])
  .title('Tus tags');

  return EntityTags;
}
