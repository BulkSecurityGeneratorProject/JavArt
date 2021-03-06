(function() {
    'use strict';

    angular
        .module('javartApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('album', {
            parent: 'entity',
            url: '/album',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'Albums'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/album/albums.html',
                    controller: 'AlbumController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
            }
        })
        .state('album-detail', {
            parent: 'entity',
            url: '/album/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'Album'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/album/album-detail.html',
                    controller: 'AlbumDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                entity: ['$stateParams', 'Album', function($stateParams, Album) {
                    return Album.get({id : $stateParams.id});
                }]
            }
        })
        .state('album.new', {
            parent: 'album',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/album/album-dialog.html',
                    controller: 'AlbumDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                name: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('album', null, { reload: true });
                }, function() {
                    $state.go('album');
                });
            }]
        })
        .state('album.edit', {
            parent: 'album',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/album/album-dialog.html',
                    controller: 'AlbumDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Album', function(Album) {
                            return Album.get({id : $stateParams.id});
                        }]
                    }
                }).result.then(function() {
                    $state.go('album', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('album.delete', {
            parent: 'album',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/album/album-delete-dialog.html',
                    controller: 'AlbumDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Album', function(Album) {
                            return Album.get({id : $stateParams.id});
                        }]
                    }
                }).result.then(function() {
                    $state.go('album', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
