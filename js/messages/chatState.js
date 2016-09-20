import chatTemplate from './chatTemplate.html';
// import charController from './chatController.js';

export default function ($stateProvider) {
  $stateProvider.state('messages', {
    parent: 'main',
    url: '/rooms/:id/chat',
    params: { id: null },
    template: chatTemplate,
    controller: 'chatController',
  });
};
