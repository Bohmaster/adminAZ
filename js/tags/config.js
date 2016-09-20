export default function (nga, admin) {

    var Tags = admin.getEntity('tags');
    var Usuarios = admin.getEntity('usuarios');
    var Entities = admin.getEntity('entities');
    var userId = JSON.parse(localStorage.getItem('az_admin_user')).id;

    Tags.listView()
    .title('Tags')
    .fields([
      nga.field('name').isDetailLink(true).detailLinkRoute("show").label('Nombre'),
      nga.field('description', 'text').label('Descripción'),
      nga.field('ownerId', 'reference')
      .targetEntity(Usuarios)
      .targetField(nga.field('name'))
      .label('Creada por'),
      nga.field('ver', 'template')
      .label('Ver')
      .pinned(true)
      .template(
        '<ma-filtered-list-button class="btn-warning" entity-name="entities" filter="{ tags: entry.values.id }" size="xs" label="Entidades relacionadas"></ma-filtered-list-button>'
      )
    ])
    .actions(['batch','<ma-create-button entity="::entity" label="Nueva"></ma-create-button>'])
    .filters([
      nga.field('name', 'template')
      .label('Nombre')
      .pinned(true)
      .template('<search placeholder="filtrar"></search>'),
    ])
    .listActions([
      '<ma-edit-button size="xs" entry="entry" entity="entity" label="Editar"></ma-edit-button>',
      '<ma-delete-button size="xs" entry="entry" entity="entity" label="Borrar"></ma-delete-button>'
    ])
    .batchActions(['delete']);

    Tags.creationView()
    .fields([
      nga.field('name').label('Nombre').validation({required: true}),
      nga.field('description', 'text').label('Descripción'),
      nga.field('ownerId').defaultValue(userId).label('').cssClasses(function(entry) { return 'hidden'; })
    ]).title('Tags');

    Tags.showView()
    .fields([
      nga.field('name').label('Nombre').validation({required: true}),
      nga.field('description', 'text').label('Descripción'),
      nga.field('ownerId', 'reference')
        .targetEntity(Usuarios)
        .targetField(nga.field('name')),
      nga.field('entities', 'embedded_list')
        .targetFields([
          nga.field('name').isDetailLink(true).label('Nombre'),
          nga.field('activate', 'template')
          .label('Estado')
          .template('<active-entity ng-if="!entry.values.active" entry="entry"></active-entity><deactive-entity ng-if="entry.values.active" entity="entry"></deactive-entity>'),
          nga.field('ver', 'template')
          .label('Ver')
          .pinned(true)
          .template(
            '<ma-filtered-list-button class="btn-warning" entity-name="adverts" filter="{ entityId: entry.values.id }" size="xs" label="Promociones"></ma-filtered-list-button>'
          )
        ])
    ])
    .title('Ver Tag')
    .actions([
      '<ma-list-button entry="entry" entity="entity" label="Lista"></ma-list-button>'
    ]);

    Tags.editionView()
    .fields([
      nga.field('name').label('Nombre').validation({required: true}),
      nga.field('description', 'text').label('Descripción'),

      nga.field('hasEntities', 'reference_many')
      .label("Negocios")
      .perPage(10000)
      .targetEntity(Entities)
      .targetField(nga.field('name'))
    ])
    .title('Editar Tag')
    .actions([
      '<ma-list-button entry="entry" entity="entity" label="Lista"></ma-list-button>',
      '<ma-delete-button entry="entry" entity="entity" label="Borrar"></ma-delete-button>'
    ]);

    Tags.deletionView().fields(
      nga.field('name').label('Nombre')
    )
    .actions(['<ma-list-button entry="entry" entity="entity" label="Lista"></ma-list-button>'])
    .title('Borrar Tag "{{ entry.values.name }}"');

    return Tags;
}
