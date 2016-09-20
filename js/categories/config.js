export default function (nga, admin) {

  var Categories = admin.getEntity('categories');
  var rootCategories = nga.entity('categories/root');
  var Cities = nga.entity('cities');

  Categories.listView()
  .fields([
    nga.field('name').isDetailLink(true).detailLinkRoute("show").label('Nombre'),
    nga.field('description','text').label('Descripción'),

    nga.field('categoryId').label('Nivel')
    .map(function truncate(value, entry) {
      entry['parent'] = value;
      return (value)?'Sub Rubro':'Rubro';
    }).transform(function allCaps(value, entry) {
      return entry['parent'];
    }).cssClasses(function(entry) {
      if(entry){
        return (entry.values.categoryId=='Rubro')?'text-center bg-success':'text-center bg-warning';
      } else {
        return '';
      }
    }),
    nga.field('priority', 'number').label('Prioridad'),
    nga.field('ver', 'template')
    .label('Ver')
    .pinned(true)
    .template(
      '<ma-filtered-list-button ng-if="entry.values.has_entities" class="btn-warning" entity-name="entities" filter="{ categoryId: entry.values.id }" size="xs" label="Negocios"></ma-filtered-list-button><ma-filtered-list-button ng-if="entry.values.categoryId==\'Rubro\'" entity-name="categories" filter="{ categoryId: entry.values.id }" size="xs" label="Subrubros"></ma-filtered-list-button>'
    )
  ])
  .filters([
    nga.field('categoryId', 'reference')
    .label('Rubro padre')
    .perPage(100000)
    .pinned(true)
    .targetEntity(rootCategories)
    .targetField(nga.field('name'))
    .attributes({ placeholder: 'Elegir Rubro' }),

    nga.field('name', 'template')
    .label('Incluye en el nombre')
    .pinned(true)
    .template('<div class="input-group"><input type="text" ng-model="value" placeholder="Search" class="form-control"></input><span class="input-group-addon"><i class="glyphicon glyphicon-search"></i></span></div>')

  ])
  .actions(['filter','<ma-create-button entity="::entity" label="Nueva"></ma-create-button>'])
  .listActions([
    '<ma-show-button size="xs" entry="entry" entity="entity" label="Detalles"></ma-show-button>',
    '<ma-edit-button size="xs" entry="entry" entity="entity" label="Editar"></ma-edit-button>',
    '<ma-delete-button size="xs" entry="entry" entity="entity" label="Borrar"></ma-delete-button>'
  ]);

    Categories.creationView()
    .fields([
      nga.field('name').label('Nombre'),
      nga.field('description','text').label('Descripción'),
      nga.field('categoryId', 'reference')
      .label('Rubro Padre')
      .perPage(100000)
      .pinned(true)
      .targetEntity(rootCategories)
      .targetField(nga.field('name'))
      .attributes({ placeholder: 'Sin rubro padre' }),

      nga.field('has_entities', 'boolean')
      .label("Tiene entidades hijas?")
      .attributes({ placeholder: "Si/No" })
      .choices([
        { value: true, label: 'Si' },
        { value: false, label: 'No' }
      ]).cssClasses('container-fluid'),

      nga.field('belongsToCity', 'reference_many')
      .label("Se lo ve en las ciudades")
      .perPage(10000)
      .targetEntity(Cities)
      .targetField(nga.field('name')),

      nga.field('priority', 'choice').label('Prioridad')
      .choices([
          { label: '1', value: '1' },{ label: '2', value: '2' },
          { label: '3', value: '3' },{ label: '4', value: '4' },
          { label: '5', value: '5' },{ label: '6', value: '6' },
          { label: '7', value: '7' },{ label: '8', value: '8' },
          { label: '9', value: '9' },{ label: '10', value: '10' },
          { label: '11', value: '11' },{ label: '12', value: '12' },
          { label: '13', value: '13' },{ label: '14', value: '14' },
          { label: '15', value: '15' },{ label: '16', value: '16' },
          { label: '17', value: '17' },{ label: '18', value: '18' },
          { label: '19', value: '19' },{ label: '20', value: '20' },
          { label: '21', value: '21' },{ label: '22', value: '22' },
          { label: '23', value: '23' },{ label: '24', value: '24' },
          { label: '25', value: '25' },{ label: '26', value: '26' },
          { label: '27', value: '27' },{ label: '28', value: '28' },
          { label: '29', value: '29' },{ label: '30', value: '30' }
      ])
    ]);

    Categories.showView()
    .fields([

      nga.field('name', 'text').label('Nombre'),
      nga.field('description', 'text').label('Descripción'),

      nga.field('has_entities','boolean').label("Negocios")
        .template(
          '<strong ng-if="!entry.values.has_entities">No tiene permitido los Negocios hijos</strong><ma-filtered-list-button ng-if="entry.values.has_entities" class="btn-warning" entity-name="entities" filter="{ categoryId: entry.values.id }" size="xs" label="Ver Negocios hijos"></ma-filtered-list-button>'
        ),

      nga.field('belongsToCity', 'reference_many')
        .label("Ciudades")
        .targetEntity(Cities)
        .targetField(nga.field('name')),

      nga.field('subcategories', 'referenced_list')
        .label('Categorías hijas')
        .targetEntity(Categories)
        .targetReferenceField('categoryId')
        .targetFields([
            nga.field('name').label('').isDetailLink(true).detailLinkRoute("show"),
            nga.field('priority', 'number').label('Prioridad')
        ]),

      nga.field('categoryId', 'reference')
        .label('Rubro Padre').isDetailLink(true).detailLinkRoute("show")
        .targetEntity(Categories)
        .targetField(nga.field('name'))
        .attributes({ placeholder: "Sin rubro padre" }),
        // .map(function(value){
        //   return (value==undefined)?'No tiene categoría padre (es Raíz)':value;
        // }),

      nga.field('priority', 'number').label('Prioridad')

    ])
    .title('Detalles del Rubro')
    .actions([
      '<ma-list-button entry="entry" entity="entity" label="Lista"></ma-list-button>',
      '<ma-edit-button entry="entry" entity="entity" label="Editar"></ma-edit-button>'
    ]);

    Categories.editionView()
    .fields([
      nga.field('name', 'text').label('Nombre'),
      nga.field('description', 'text').label('Descripción'),
      nga.field('categoryId', 'reference')
      .label('Rubro Padre')
      .perPage(100000)
      .pinned(true)
      .targetEntity(rootCategories)
      .targetField(nga.field('name'))
      .attributes({ placeholder: "Sin rubro padre" }),

      nga.field('has_entities', 'boolean')
      .label("Tiene entidades hijas?")
      .attributes({ placeholder: "Si/No" })
      .choices([
        { value: true, label: 'Si' },
        { value: false, label: 'No' }
      ]).cssClasses('container-fluid'),

      nga.field('belongsToCity', 'reference_many')
      .label("Ciudades")
      .perPage(10000)
      .targetEntity(Cities)
      .targetField(nga.field('name'))
      .attributes({ placeholder: "Elegir ciudades" }),

      nga.field('priority', 'choice').label('Prioridad')
      .choices([
          { label: '1', value: '1' },{ label: '2', value: '2' },
          { label: '3', value: '3' },{ label: '4', value: '4' },
          { label: '5', value: '5' },{ label: '6', value: '6' },
          { label: '7', value: '7' },{ label: '8', value: '8' },
          { label: '9', value: '9' },{ label: '10', value: '10' },
          { label: '11', value: '11' },{ label: '12', value: '12' },
          { label: '13', value: '13' },{ label: '14', value: '14' },
          { label: '15', value: '15' },{ label: '16', value: '16' },
          { label: '17', value: '17' },{ label: '18', value: '18' },
          { label: '19', value: '19' },{ label: '20', value: '20' },
          { label: '21', value: '21' },{ label: '22', value: '22' },
          { label: '23', value: '23' },{ label: '24', value: '24' },
          { label: '25', value: '25' },{ label: '26', value: '26' },
          { label: '27', value: '27' },{ label: '28', value: '28' },
          { label: '29', value: '29' },{ label: '30', value: '30' }
      ]),

      nga.field('subdomain', 'template')
      .label('Subdominio')
      .template('<subdomain></subdomain>'),
      nga.field('logo', 'template')
      .label('Logotipo (imagen de baja resolución)')
      .template('<entity-image target="logo"></entity-image>'),
      nga.field('cover', 'template')
      .label('Portada (imagen widescreen de baja resolución)')
      .template('<entity-image target="cover"></entity-image>'),
      nga.field('webcover', 'template')
      .label('Cover web (imagen de alta resolución)')
      .template('<entity-image target="webcover"></entity-image>'),

      // nga.field('subcategories', 'referenced_list')
      //   .label('Categorías hijas')
      //   .targetEntity(category)
      //   .targetReferenceField('categoryId')
      //   .targetFields([
      //       nga.field('name').label('')
      //   ])
    ])
    .title('Editando "{{ entry.values.name }}"')
    .actions([
      '<ma-list-button entry="entry" entity="entity" label="Lista"></ma-list-button>',
      '<ma-delete-button entry="entry" entity="entity" label="Borrar"></ma-delete-button>'
    ]);

    Categories.deletionView().fields(
      nga.field('name').label('Nombre')
    )
    .actions(['<ma-list-button entry="entry" entity="entity" label="Lista"></ma-list-button>'])
    .title('Borrar "{{ entry.values.name }}"');

    return Categories;

}
