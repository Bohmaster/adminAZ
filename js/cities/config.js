export default function (nga, admin) {

  var Cities = admin.getEntity('cities');
  var States = admin.getEntity('states');

  Cities.listView()
  .fields([
    nga.field('name').isDetailLink(true).detailLinkRoute("edit").label('Nombre'),
    nga.field('zipcode','text').label('Código Postal'),
    nga.field('stateId', 'reference')
      .targetEntity(States)
      .targetField(nga.field('name'))
      .label('Provincia')
  ])
  .filters([
    nga.field('stateId', 'reference')
    .label('Provincia')
    .pinned(true)
    .targetEntity(States)
    .targetField(nga.field('name'))
    .attributes({ placeholder: 'Elegir' })
  ])
  .actions(['<ma-create-button entity="::entity" label="Nueva"></ma-create-button>'])
  .listActions([
    '<ma-edit-button size="xs" entry="entry" entity="entity" label="Editar"></ma-edit-button>',
    '<ma-delete-button size="xs" entry="entry" entity="entity" label="Borrar"></ma-delete-button>'
  ])
  .title('Ciudades');

  Cities.creationView()
  .fields([
    nga.field('stateId', 'reference')
      .validation({required: true})
      .targetEntity(States)
      .targetField(nga.field('name'))
      .label('Provincia'),
    nga.field('name').isDetailLink(true).detailLinkRoute("edit").label('Nombre'),
    nga.field('zipcode','text').label('Código Postal'),
    nga.field('facebook_page_id','text').label('Facebook Fan Page ID'),
    nga.field('facebook_page_token','text').label('Facebook Fan Page TOKEN')

  ]).title('Nueva Ciudad');

  Cities.editionView()
  .fields([
    nga.field('stateId', 'reference')
      .validation({required: true})
      .targetEntity(States)
      .targetField(nga.field('name'))
      .label('Provincia'),
    nga.field('name').isDetailLink(true).detailLinkRoute("edit").label('Nombre'),
    nga.field('zipcode','text').label('Código Postal'),
    nga.field('geopoint', 'template')
    .label('Geo Localización')
    .template('<geo></geo>'),
    nga.field('facebook_page_id','text').label('Facebook Fan Page ID'),
    nga.field('facebook_page_token','text').label('Facebook Fan Page TOKEN')
  ])
  .title('Editando "{{ entry.values.name }}"')
  .actions([
    '<ma-list-button entry="entry" entity="entity" label="Lista"></ma-list-button>',
    '<ma-delete-button entry="entry" entity="entity" label="Borrar"></ma-delete-button>'
  ]);

  Cities.deletionView().fields(
    nga.field('name').label('Nombre')
  )
  .actions(['<ma-list-button entry="entry" entity="entity" label="Lista"></ma-list-button>'])
  .title('Estás completamente seguro? Posiblemente estes borrando datos importantes relacionados a esta cidad, como negocios, promociones y usuarios...');

  return Cities;

}
