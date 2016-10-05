export default function (nga, admin) {

  var Products = admin.getEntity('products');

  var entityId = JSON.parse(localStorage.getItem('az_admin_user')).entityId;

  Products.listView()
  .permanentFilters({
    entityId: entityId
  })
  .fields([
    nga.field('title').isDetailLink(true).detailLinkRoute("show").label('Título'),
    nga.field('description', 'text').label('Descripción'),
    nga.field('creation_date','date').label('Creado el día'),
    nga.field('facebook', 'template')
      .label('Facebook')
      .template('<publish-facebook></publish-facebook>')
  ])
  .filters([
    nga.field('title', 'template')
    .label('Título')
    .pinned(true)
    .template('<search placeholder="filtrar"></search>'),

    nga.field('description', 'template')
    .label('Descripción')
    .pinned(true)
    .template('<search placeholder="filtrar"></search>')
  ])
  .actions(['batch','<a type="button" entity="::entity" href="#/products/create-prod">Nueva</a>'])
  .listActions([
    '<ma-edit-button size="xs" entry="entry" entity="entity" label="Editar"></ma-edit-button>',
    '<ma-delete-button size="xs" entry="entry" entity="entity" label="Borrar"></ma-delete-button>'
  ])
  .title('Productos');

  Products.creationView().fields([
    nga.field('dummy').label('').template('Completa los campos de texto, guarda la promo o destacado para luego editarlo y poder agregar la imagen que quieras. Compartila automáticamente en Facebook'),

    nga.field('banner', 'choice')
    .defaultValue(false)
    .attributes({ placeholder: 'Tipo' })
    .choices([
      { value: false, label: 'Texto' },
      { value: true, label: 'Banner' }
    ]).label('Tipo de Promoción'),

    nga.field('title').label('Título').validation({required: true}),
    nga.field('subtitle', 'text').label('Subtítulo'),
    nga.field('description', 'text').label('Descripción').validation({required: true}),
    nga.field('date_description', 'text').label('Descripción de fecha'),
    nga.field('entityId').defaultValue(entityId).label('').cssClasses(function(entry) { return 'hidden'; })

  ])
  .actions([
    '<ma-list-button entry="entry" entity="entity" label="Lista"></ma-list-button>'
  ])
  .title('Crear nueva Promoción');

  Products.editionView().fields([
    nga.field('banner', 'choice')
    .defaultValue(false)
    .attributes({ placeholder: 'Tipo' })
    .choices([
      { value: false, label: 'Texto' },
      { value: true, label: 'Banner' }
    ]).label('Tipo de Promoción'),

    nga.field('cover', 'template')
    .label('Banner')
    .template('<img src="57d072f3fbb500131180dc70"></img>'),

    nga.field('title').label('Título'),
    nga.field('subtitle', 'text').label('Subtítulo'),
    nga.field('description', 'text').label('Descripción'),
    nga.field('date_description', 'text').label('Descripción de fecha')

  ])
  .title('Editar Promoción')
  .actions([
    '<ma-list-button entry="entry" entity="entity" label="Lista"></ma-list-button>',
    '<ma-delete-button entry="entry" entity="entity" label="Borrar"></ma-delete-button>'
  ]);

  Products.showView().fields([
    nga.field('banner').label('Tipo de Promoción')
    .map(function(value){
      return (value)?'Banner':'Texto';
    }),

    nga.field('cover', 'template')
    .label('Imagen')
    .template('<entity-image target="advert" view="show"></entity-image>'),

    nga.field('title').label('Título'),
    nga.field('description', 'text').label('Descripción'),
    nga.field('creation_date','date').label('Creado el día').format('dd/MM/yyyy'),

    // nga.field('facebookPostId', 'template').label('Facebook')
    // .template('<publish-facebook ng-if="!value"></publish-facebook><a ng-if="value" ng-href="https://www.facebook.com/{{value}}" target="_blank">https://www.facebook.com/{{value}}</a>'),

    nga.field('facebookPostId', 'template').label('Facebook')
    .template('<publish-facebook></publish-facebook>')

  ]).title('Promociones');

  Products.deletionView().fields(
    nga.field('title').label('Titulo')
  )
  .actions(['<ma-list-button entry="entry" entity="entity" label="Lista"></ma-list-button>'])
  .title('Borrar "{{ entry.values.title }}"');

  return Products;

}
