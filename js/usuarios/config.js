export default function (nga, admin) {

  var Usuarios = admin.getEntity('usuarios');

  Usuarios.listView()
    .title('Usuarios')
    .fields([
      nga.field('username').isDetailLink(true).detailLinkRoute("edit").label('Username'),
      nga.field('name', 'text').label('Nombre'),
      nga.field('email', 'text').label('Email'),
      nga.field('createdDate','date').label('Desde')
    ])
    .filters([
      nga.field('owner', 'boolean')
        .choices([
          { label: 'Usuario de App' },
          { label: 'Dueño de negocio' }
        ])
        .pinned(true)
        .label("Tipo [true:dueños/false:usuarios]")
        .attributes({ placeholder: "Todos" }),
      nga.field('name', 'template')
      .label('Nombre:')
      .pinned(true)
      .template('<search placeholder="Búsqueda por nombre"></search>'),
      nga.field('username', 'template')
      .label('Username:')
      .pinned(true)
      .template('<search placeholder="Búsqueda por username"></search>')
    ])
    .actions(['<ma-create-button entity="::entity" label="Nuevo"></ma-create-button>'])
    .listActions([
      '<ma-edit-button size="xs" entry="entry" entity="entity" label="Editar"></ma-edit-button>',
      '<ma-delete-button size="xs" entry="entry" entity="entity" label="Borrar"></ma-delete-button>'
    ]);

  Usuarios.creationView().fields([
    nga.field('username').isDetailLink(true).detailLinkRoute("show").label('Username'),
    nga.field('name', 'text').label('Nombre'),
    nga.field('email', 'text').label('Email'),
    nga.field('password', 'text').label('Contraseña')
  ]).title('Usuarios');

  Usuarios.editionView().fields([
    nga.field('username').isDetailLink(true).detailLinkRoute("show").label('Username'),
    nga.field('name', 'text').label('Nombre'),
    nga.field('email', 'text').label('Email'),
    nga.field('password', 'text').label('Contraseña')
  ]).title('Editar Usuario "{{ entry.values.name }}"');

  Usuarios.deletionView().fields(
    nga.field('name').label('Nombre')
  )
  .actions(['<ma-list-button entry="entry" entity="entity" label="Lista"></ma-list-button>'])
  .title('Borrar Usuario "{{ entry.values.username }}"');

  return Usuarios;

}
