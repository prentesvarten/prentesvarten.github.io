'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var ByggemAppen = angular.module('app', ['ngAnimate', 'ui.select', 'ngFileUpload', 'mgcrea.ngStrap', 'hl.sticky', 'ngTagsInput', 'angular.filter', 'angularMoment']);

ByggemAppen.factory('documentFactory', function ($http) {
  return $http.get('/assets/js/data/documents.json');
});

ByggemAppen.factory('issueFactory', function ($http) {
  return $http.get('/assets/js/data/issues.json');
});

ByggemAppen.factory('changeRequestFactory', function ($http) {
  return $http.get('/assets/js/data/change-requests.json');
});

ByggemAppen.factory('milestonesFactory', function ($http) {
  return $http.get('/assets/js/data/milestones.json');
});

ByggemAppen.factory('checklistsFactory', function ($http) {
  return $http.get('/assets/js/data/checklists_ext.json');
});

ByggemAppen.factory('checkinsFactory', function ($http) {
  return $http.get('/assets/js/data/checkins.json');
});

ByggemAppen.factory('usersFactory', function ($http) {
  return $http.get('/assets/js/data/users.json');
});

ByggemAppen.config(function ($interpolateProvider) {
  $interpolateProvider.startSymbol('{[{');
  $interpolateProvider.endSymbol('}]}');
});

// Fix clear button in ui-select
// Override ui-select bootstrap theme
ByggemAppen.run(function ($templateCache) {
  /* eslint-disable max-len */
  $templateCache.put('bootstrap/match.tpl.html', '\n  <div class="ui-select-match" ng-hide="$select.open && $select.searchEnabled" ng-disabled="$select.disabled" ng-class="{\'btn-default-focus\':$select.focus}">\n    <span tabindex="-1" class="btn btn-default form-control ui-select-toggle" aria-label="{{ $select.baseTitle }} activate" ng-disabled="$select.disabled" ng-click="$select.activate()" style="outline: 0;">\n      <span ng-show="$select.isEmpty()" class="ui-select-placeholder text-muted">{{$select.placeholder}}</span> \n      <span ng-hide="$select.isEmpty()" class="ui-select-match-text pull-left" ng-class="{\'ui-select-allow-clear\': $select.allowClear && !$select.isEmpty()}" ng-transclude=""></span> \n      <i class="caret pull-right" ng-click="$select.toggle($event)"></i> \n      <a ng-show="$select.allowClear && !$select.isEmpty() && ($select.disabled !== true)" aria-label="{{ $select.baseTitle }} clear" ng-click="$select.clear($event)" class="btn btn-xs btn-link pull-right">\n          <span class="fa fa-remove" aria-hidden="true"></span>\n      </a>\n    </span>\n  </div>\n  ');
});

ByggemAppen.filter('capitalize', function () {
  return function (s) {
    return angular.isString(s) && s.length > 0 ? s[0].toUpperCase() + s.substr(1).toLowerCase() : s;
  };
});

ByggemAppen.filter('filesize', function () {
  return function (size) {
    if (isNaN(size)) {
      size = 0;
    }

    if (size < 1024) {
      return size + ' B';
    }

    size /= 1024;

    if (size < 1024) {
      return size.toFixed(2) + ' Kb';
    }

    size /= 1024;

    if (size < 1024) {
      return size.toFixed(2) + ' Mb';
    }

    size /= 1024;

    if (size < 1024) {
      return size.toFixed(2) + ' Gb';
    }

    size /= 1024;

    return size.toFixed(2) + ' Tb';
  };
});

ByggemAppen.filter('sumOfValue', function () {
  return function (data, key) {
    if (angular.isUndefined(data) || angular.isUndefined(key)) {
      return 0;
    }
    var sum = 0;

    angular.forEach(data, function (value) {
      sum = sum + parseInt(value[key], 10);
    });
    return sum;
  };
});
ByggemAppen.filter('absolute', function () {
  return function (input) {
    return Math.abs(input);
  };
});
ByggemAppen.directive('sign', function () {
  return {
    scope: {
      value: '='
    },
    template: '<span ng-if="value!==0" ng-switch="value>=0"><span ng-switch-when="true">&plus;</span>' + '<span ng-switch-when="false">&minus;</span></span>'
  };
});
ByggemAppen.filter('formatPlusMinus', function () {
  return function (value) {
    if (angular.isUndefined(value)) {
      return '';
    }
    if (value[0] === '0') {
      return value;
    } else if (value[0] === '-') {
      return '&minus; ' + value;
    } else {
      return '/002B ' + value;
    }
  };
});
ByggemAppen.filter('minutesToHours', function () {

  function pad() {
    var num = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var size = arguments[1];

    var s = num + '';

    while (s.length < size) {
      s = '0' + s;
    }
    return s;
  }

  return function () {
    var totalMinutes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

    var hours = Math.floor(totalMinutes / 60);
    var minutes = totalMinutes - hours * 60;

    return hours + ':' + pad(minutes, 2);
  };
});

ByggemAppen.controller('ByggemAppenController', function ($scope, $timeout, $window, $sce, documentFactory, issueFactory, changeRequestFactory, milestonesFactory, checklistsFactory, checkinsFactory, usersFactory, $q, $interval, $http, $templateCache) {

  $scope.mockData = {};

  $scope.date = new Date();

  var mockTags = [{ text: 'Lorem' }, { text: 'Ipsum' }, { text: 'Dolor' }, { text: 'Sit amet' }, { text: 'Adipiscing' }, { text: 'Elit' }];

  $scope.loadTags = function () {
    return mockTags;
  };

  /**
   * Main app controller dummy.
   */

  $scope.greaterThanOrEqual = function (prop, val) {
    return function (item) {
      return item[prop] >= val;
    };
  };
  $scope.lessThan = function (prop, val) {
    return function (item) {
      return item[prop] < val;
    };
  };

  $scope.trustAsHtml = function (value) {
    return $sce.trustAsHtml(value);
  };
  $scope.trustSrc = function (src) {
    return $sce.trustAsResourceUrl(src);
  };

  $scope.login = function (email, password, path) {
    $scope.loginPending = true;
    $timeout(function () {

      if (email === 'admin@zaven.co' && password === 'password') {
        $window.location.href = path;
      } else {
        console.log(email + ' / ' + password);
        $scope.loginPending = false;
        $scope.loginErrorMessage = 'Wrong login or password';
      }
    }, 2000);
  };

  $scope.editProjectChanges = {
    currentImage: true,
    newImage: false,
    removeCurrentImage: function removeCurrentImage() {
      $scope.editProjectChanges.currentImage = false;
      $scope.editProjectChanges.newImage = false;
    },
    restoreCurrentImage: function restoreCurrentImage() {
      $scope.editProjectChanges.currentImage = true;
      $scope.editProjectChanges.newImage = false;
    },
    replaceCurrentImage: function replaceCurrentImage() {
      $scope.editProjectChanges.currentImage = false;
      $scope.editProjectChanges.newImage = true;
    }
  };

  $scope.editProjectGroup = {
    name: 'Lorem ipsum dolor',
    parent: '001'
  };

  $scope.editProject = {
    name: 'KS «Norge»',
    mmsi: '257001000',
    internalNumber: 'JDS643-452/123K',
    imageSmallUrl: 'project_ksnorge.jpg',
    keepCurrentImage: true,
    settings: {
      hideSpectatorsFromEachOther: false
    },
    groupId: '001',
    size: 2,
    tags: [{ text: 'Lorem' }, { text: 'Ipsum' }, { text: 'Dolor' }],
    moduleChecklists: true,
    moduleMilestones: true,
    moduleCheckins: false
  };

  $scope.projectGroups = [{
    name: 'Lorem ipsum',
    id: '001',
    parent: null,
    level: 0
  }, {
    name: 'Nominatur',
    id: '004',
    parent: '001',
    level: 1
  }, {
    name: 'Neromanster',
    id: '006',
    parent: '004',
    level: 2
  }, {
    name: 'Crescendum',
    id: '005',
    parent: '001',
    level: 1
  }, {
    name: 'Dolor sit amet',
    id: '002',
    parent: null,
    level: 0
  }, {
    name: 'Adipiscing elit',
    id: '003',
    parent: null,
    level: 0
  }];

  $scope.billingAddress = {
    companyName: 'Zaven Sp. z o.o.',
    street: 'ul. Kiełczowska 70',
    city: 'Wrocław',
    code: '51-354',
    country: 'Poland',
    taxId: '123875324298765',
    firstName: 'Klaus',
    lastName: 'Mustermann',
    email: 'klaus.mustermann@nordbohus.com',
    phone: '+48 123456789'
  };

  $scope.projectsView = {
    style: 'tiles'
  };

  $scope.projectRoles = [{
    title: 'Project Manager',
    stub: 'projectmanager'
  }, {
    title: 'Client',
    stub: 'client'
  }, {
    title: 'Crew',
    stub: 'crew'
  }, {
    title: 'Contractor',
    stub: 'contractor'
  }, {
    title: 'Spectator',
    stub: 'spectator'
  }];

  $scope.addDocument = function (files, cat) {
    var force = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;


    if (files.length > 0) {
      var _$scope$addDocumentMo;

      $scope.activeDocument = null;

      if (!angular.isDefined($scope.addDocumentModel) || force) {
        $scope.addDocumentModel = {
          files: [],
          category: cat || 'other'
        };
      }

      (_$scope$addDocumentMo = $scope.addDocumentModel.files).push.apply(_$scope$addDocumentMo, _toConsumableArray(files));

      if (files.length === 1) {
        $timeout(function () {
          $scope.addDocumentModel.name = files[0].name;
          angular.element('#adddocument-form-name').focus();
        });
      }
    }
  };

  $scope.updateDocument = function (files, document) {
    if (files.length > 0) {
      $scope.updateDocumentModel = {
        file: files[0],
        id: document.id
      };
      angular.element('#update-document-modal').modal('show');
    }
  };

  $scope.removeDocumentInForm = function (index) {
    $scope.addDocumentModel.files.splice(index, 1);

    if ($scope.addDocumentModel.files.length === 0) {
      $scope.addDocumentResetForm();
    }

    if ($scope.addDocumentModel.files.length === 1) {
      $scope.addDocumentModel.name = $scope.addDocumentModel.files[0].name;
    }
  };

  $scope.addDocumentResetForm = function () {
    delete $scope.addDocumentModel;
    $scope.addDocumentForm.$setPristine();
  };

  $scope.updateDocumentResetForm = function () {
    delete $scope.updateDocumentModel;
    // $scope.updateDocumentForm.$setPristine();
  };

  $scope.addDocumentCancel = function () {
    console.log('Document not added');
    delete $scope.addDocumentModel;
    $scope.addDocumentResetForm();
  };

  var uploadSingleFile = function uploadSingleFile(file) {
    return $q(function (resolve) {
      file.status = 'uploading';
      file.uploadProgress = 0;

      $interval(function () {
        return file.uploadProgress++;
      }, 20, 100).then(function () {
        file.status = 'done';
        console.log('uploaded ' + file.name);
        resolve();
      });
    });
  };

  var uploadFiles = function uploadFiles(files) {
    var queue = files.map(function (file) {
      return uploadSingleFile.bind(null, file);
    });

    $scope.addDocumentModel.files.forEach(function (file) {
      file.status = 'waiting';
    });
    queue.reduce(function (promise, func) {
      return promise.then(function (result) {
        return func().then(Array.prototype.concat.bind(result));
      });
    }, $q.resolve([]));
  };

  $scope.addDocumentSave = function () {
    if ($scope.addDocumentModel.files.length > 1) {
      uploadFiles($scope.addDocumentModel.files);
    }

    console.log('Document added');

    console.dir($scope.addDocumentModel);
    $scope.updateDocumentResetForm();
  };

  $scope.updateDocumentCancel = function () {
    console.log('Document update cancelled');
    $scope.updateDocumentResetForm();
    angular.element('#update-document-modal').modal('hide');
  };

  $scope.updateDocumentSave = function () {
    console.log('Document updated with comment: ' + $scope.updateDocumentModel.comment);
    angular.element('#update-document-modal').modal('hide');
    $scope.updateDocumentResetForm();
  };

  $scope.editDocumentCancel = function () {
    console.log('Document edit cancelled');
    $scope.editDocumentResetForm();
  };

  $scope.editDocumentSave = function () {
    console.log('Document edit saved');
    $scope.editDocumentResetForm();
  };

  $scope.categories = [{
    slug: 'sfi-1',
    name: '1 General',
    parent: null,
    documents: [],
    isCustom: false
  }, {
    slug: 'sfi-2',
    name: '2 Hull Systems',
    parent: null,
    documents: [],
    isCustom: false
  }, {
    slug: 'sfi-3',
    name: '3 Cargo Equipment',
    parent: null,
    documents: [],
    newChildrenCount: 1,
    isCustom: false
  }, {
    slug: 'sfi-4',
    name: '4 Ship Equipment',
    parent: null,
    documents: [],
    newChildrenCount: 2,
    isCustom: false
  }, {
    slug: 'sfi-5',
    name: '5 Crew and Passenger Equipment',
    parent: null,
    documents: [],
    isCustom: false
  }, {
    slug: 'sfi-6',
    name: '6 Machinery Main Components',
    parent: null,
    documents: [],
    isCustom: false
  }, {
    slug: 'sfi-7',
    name: '7 Systems for Machinery Main Components',
    parent: null,
    documents: [],
    newChildrenCount: 3,
    isCustom: false
  }, {
    slug: 'sfi-8',
    name: '8 Common Systems',
    parent: null,
    documents: [],
    isCustom: false
  }, {
    slug: 'custom-public',
    name: 'Custom public folder',
    icon: 'fa-file-text',
    parent: null,
    documents: [],
    isCustom: true,
    isPrivate: false
  }, {
    slug: 'custom-private',
    name: 'Custom private folder',
    icon: 'fa-file-text',
    parent: null,
    documents: [],
    isNew: true,
    newChildrenCount: 1,
    isCustom: true,
    isPrivate: true
  }];

  $scope.isSpiFolder = function (folder) {
    return folder.slug.substr(0, 4) === 'sfi-' && folder.parent === null;
  };

  $scope.categoryCount = 0;
  $scope.activeCategory = null;
  $scope.activeCategories = [];
  $scope.incrementCategoryIndex = function () {
    $scope.categoryCount++;
    return $scope.categoryCount;
  };

  $scope.getCategoryIndex = function (slug, categories) {
    var arr = categories.map(function (category) {
      return category.slug;
    });

    return arr.indexOf(slug);
  };

  $scope.getParentCategoryBySlug = function (slug, categories) {
    return categories.find(function (c) {
      return c.slug === slug;
    });
  };

  $scope.openCategory = function () {
    var slug = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

    $scope.activeCategory = $scope.categories.find(function (c) {
      return c.slug === slug;
    });
  };

  $scope.selectCategory = function () {
    var slug = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

    $scope.selectedCategory = $scope.categories.find(function (c) {
      return c.slug === slug;
    });
  };

  $scope.openDocument = function (id) {
    $scope.addDocumentResetForm();
    $scope.updateDocumentResetForm();
    $scope.documents.map(function (obj) {
      obj.active = false;
      if (obj.id === id) {
        obj.active = true;
        $scope.activeDocument = obj;
      }
    });
  };

  $scope.closeDocument = function () {
    $scope.activeDocument = null;
    $scope.documents.map(function (obj) {
      obj.active = false;
    });
  };

  $scope.selectDocument = function (id) {
    $scope.selectedDocument = $scope.selectedDocument !== id ? id : null;
  };

  documentFactory.then(function (res) {
    $scope.documents = res.data;
    $scope.categories.map(function (cat) {
      $scope.documents.map(function (obj) {
        if (obj.category === cat.slug) {
          cat.documents.push(obj);
        }
      });
    });
  });

  issueFactory.then(function (res) {
    $scope.mockData.issues = res.data;
  });

  changeRequestFactory.then(function (res) {
    $scope.mockData.changeRequests = res.data;
  });

  milestonesFactory.then(function (res) {
    $scope.mockData.milestones = res.data;
  });

  checklistsFactory.then(function (res) {
    $scope.mockData.checklistGroups = res.data;

    $scope.mockData.allChecklists = res.data.map(function (group) {
      return group.checklists;
    }).reduce(function (a, b) {
      return a.concat(b);
    }).map(function (checklist) {
      checklist.itemsCompleted = checklist.items.filter(function (item) {
        return item.status === 'complete';
      }).length;
      checklist.itemsTotal = checklist.items.length;
      return checklist;
    });
    $scope.mockData.allChecklists.itemsTotal = $scope.mockData.allChecklists.reduce(function (a, b) {
      return a + b.itemsTotal;
    }, 0);
    $scope.mockData.allChecklists.itemsCompleted = $scope.mockData.allChecklists.reduce(function (a, b) {
      return a + b.itemsCompleted;
    }, 0);
    $scope.mockData.allChecklistsCompleted = $scope.mockData.allChecklists.reduce(function (a, b) {
      return b.itemsTotal > b.itemsCompleted ? a : a + 1;
    }, 0);

    $scope.mockData.checklistsInGroup = $scope.mockData.checklistGroups[0].checklists.map(function (checklist) {
      var cleanGroup = angular.copy($scope.mockData.checklistGroups[0]);

      delete cleanGroup.checklists;
      checklist.group = cleanGroup;
      checklist.items = checklist.items.filter(function (item) {
        return item.status !== 'ignored';
      }).map(function (item) {
        item.openIssuesCount = item.issues.filter(function (i) {
          return i.status === 'open';
        }).length;
        return item;
      });
      return checklist;
    });
  });

  checkinsFactory.then(function (res) {

    var updateDates = function updateDates(checkIn) {
      if (angular.isDefined(checkIn.dateFrom)) {
        var day = new Date(new Date(checkIn.dateFrom).setHours(0, 0, 0, 0));
        var dateToIso = new Date(checkIn.dateTo.slice(0, -4));

        checkIn.day = day.toISOString();
        checkIn.dateTo = dateToIso.toISOString();
      }
      return checkIn;
    };

    $scope.mockData.checkins = res.data.map(function (c) {
      return updateDates(c);
    });
  });

  usersFactory.then(function (res) {
    $scope.mockData.users = res.data;
  });

  $scope.searchChecklistItems = function (query) {

    query = angular.isDefined(query) ? query.toLowerCase() : query;

    return function (item) {
      return !query || item.name.toLowerCase().indexOf(query) !== -1;
    };
  };

  $scope.checklistItemsFilteredCount = function () {
    var items = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

    var flattened = items.length > 0 ? items.reduce(function (a, b) {
      return a.concat(b);
    }) : items;

    return flattened.length;
  };

  $scope.openFilterIssuesModal = function () {
    angular.element('#filter-issues-modal').modal('show');
  };

  $scope.addIssue = function (files) {
    files = files || [];
    $scope.activeIssue = null;
    delete $scope.addChangeRequestModel;
    delete $scope.addChangeRequestModelTemp;
    $scope.addIssueModel = {
      file: files[0] || null
    };
    $timeout(function () {
      angular.element('#add-issue-form-title').focus();
    });
  };

  $scope.addIssueFile = function (files) {
    files = files || [];
    $scope.addIssueModel.file = files[0] || null;
    console.log('Image set');
    console.dir($scope.addIssueModel.file);
  };

  $scope.resetAddIssueForm = function () {
    delete $scope.addIssueModel;
    $scope.addIssueForm.$setPristine();
  };

  $scope.addIssueCancel = function () {
    console.log('Issue not added');
    $scope.addIssueModel = null;
    $scope.resetAddIssueForm();
  };

  $scope.addIssueSave = function () {
    console.log('Issue added');
    console.dir($scope.addIssueModel);
    $scope.resetAddIssueForm();
  };

  $scope.openIssue = function (id) {
    if (angular.isDefined($scope.activeIssue)) {
      $scope.closeIssue();
    }
    $scope.resetAddIssueForm();
    $scope.mockData.issues.map(function (obj) {
      obj.active = false;
      if (obj.id === id) {
        obj.active = true;
        $scope.activeIssue = obj;
      }
    });
    $timeout(function () {
      $scope.scrollToBottom();
    });
    console.log('Issue opened');
  };

  $scope.closeIssue = function () {
    delete $scope.activeIssue;
    $scope.mockData.issues.map(function (obj) {
      obj.active = false;
    });
    console.log('Issue closed');
  };

  $scope.addChangeRequest = function (model) {
    $scope.addChangeRequestModel = model;
  };

  $scope.removeChangeRequest = function () {
    delete $scope.addChangeRequestModel;
    delete $scope.addChangeRequestModelTemp;
  };

  $scope.scrollToBottom = function () {
    var elem = document.getElementById('active-issue-entries');

    elem.scrollTop = elem.scrollHeight;
  };

  // Generate random number for each ngRepeat without causing digest overflow
  var rand = 1;

  $scope.generateAvatarPlaceholderIndex = function () {
    rand = Math.floor(Math.random() * 5);
  };

  $scope.getAvatarPlaceholderIndex = function () {
    return rand;
  };

  //   Add Checkin form
  var today = new Date();

  $scope.checkinListMonth = new Date(today.getFullYear(), today.getMonth(), 1, 0, 0, 0);
  $scope.addCheckinModel = {
    dateFrom: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 7, 0, 0),
    dateTo: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 15, 0, 0)
  };
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyJCeWdnZW1BcHBlbiIsImFuZ3VsYXIiLCJtb2R1bGUiLCJmYWN0b3J5IiwiJGh0dHAiLCJnZXQiLCJjb25maWciLCIkaW50ZXJwb2xhdGVQcm92aWRlciIsInN0YXJ0U3ltYm9sIiwiZW5kU3ltYm9sIiwicnVuIiwiJHRlbXBsYXRlQ2FjaGUiLCJwdXQiLCJmaWx0ZXIiLCJzIiwiaXNTdHJpbmciLCJsZW5ndGgiLCJ0b1VwcGVyQ2FzZSIsInN1YnN0ciIsInRvTG93ZXJDYXNlIiwic2l6ZSIsImlzTmFOIiwidG9GaXhlZCIsImRhdGEiLCJrZXkiLCJpc1VuZGVmaW5lZCIsInN1bSIsImZvckVhY2giLCJ2YWx1ZSIsInBhcnNlSW50IiwiaW5wdXQiLCJNYXRoIiwiYWJzIiwiZGlyZWN0aXZlIiwic2NvcGUiLCJ0ZW1wbGF0ZSIsInBhZCIsIm51bSIsInRvdGFsTWludXRlcyIsImhvdXJzIiwiZmxvb3IiLCJtaW51dGVzIiwiY29udHJvbGxlciIsIiRzY29wZSIsIiR0aW1lb3V0IiwiJHdpbmRvdyIsIiRzY2UiLCJkb2N1bWVudEZhY3RvcnkiLCJpc3N1ZUZhY3RvcnkiLCJjaGFuZ2VSZXF1ZXN0RmFjdG9yeSIsIm1pbGVzdG9uZXNGYWN0b3J5IiwiY2hlY2tsaXN0c0ZhY3RvcnkiLCJjaGVja2luc0ZhY3RvcnkiLCJ1c2Vyc0ZhY3RvcnkiLCIkcSIsIiRpbnRlcnZhbCIsIm1vY2tEYXRhIiwiZGF0ZSIsIkRhdGUiLCJtb2NrVGFncyIsInRleHQiLCJsb2FkVGFncyIsImdyZWF0ZXJUaGFuT3JFcXVhbCIsInByb3AiLCJ2YWwiLCJpdGVtIiwibGVzc1RoYW4iLCJ0cnVzdEFzSHRtbCIsInRydXN0U3JjIiwic3JjIiwidHJ1c3RBc1Jlc291cmNlVXJsIiwibG9naW4iLCJlbWFpbCIsInBhc3N3b3JkIiwicGF0aCIsImxvZ2luUGVuZGluZyIsImxvY2F0aW9uIiwiaHJlZiIsImNvbnNvbGUiLCJsb2ciLCJsb2dpbkVycm9yTWVzc2FnZSIsImVkaXRQcm9qZWN0Q2hhbmdlcyIsImN1cnJlbnRJbWFnZSIsIm5ld0ltYWdlIiwicmVtb3ZlQ3VycmVudEltYWdlIiwicmVzdG9yZUN1cnJlbnRJbWFnZSIsInJlcGxhY2VDdXJyZW50SW1hZ2UiLCJlZGl0UHJvamVjdEdyb3VwIiwibmFtZSIsInBhcmVudCIsImVkaXRQcm9qZWN0IiwibW1zaSIsImludGVybmFsTnVtYmVyIiwiaW1hZ2VTbWFsbFVybCIsImtlZXBDdXJyZW50SW1hZ2UiLCJzZXR0aW5ncyIsImhpZGVTcGVjdGF0b3JzRnJvbUVhY2hPdGhlciIsImdyb3VwSWQiLCJ0YWdzIiwibW9kdWxlQ2hlY2tsaXN0cyIsIm1vZHVsZU1pbGVzdG9uZXMiLCJtb2R1bGVDaGVja2lucyIsInByb2plY3RHcm91cHMiLCJpZCIsImxldmVsIiwiYmlsbGluZ0FkZHJlc3MiLCJjb21wYW55TmFtZSIsInN0cmVldCIsImNpdHkiLCJjb2RlIiwiY291bnRyeSIsInRheElkIiwiZmlyc3ROYW1lIiwibGFzdE5hbWUiLCJwaG9uZSIsInByb2plY3RzVmlldyIsInN0eWxlIiwicHJvamVjdFJvbGVzIiwidGl0bGUiLCJzdHViIiwiYWRkRG9jdW1lbnQiLCJmaWxlcyIsImNhdCIsImZvcmNlIiwiYWN0aXZlRG9jdW1lbnQiLCJpc0RlZmluZWQiLCJhZGREb2N1bWVudE1vZGVsIiwiY2F0ZWdvcnkiLCJwdXNoIiwiZWxlbWVudCIsImZvY3VzIiwidXBkYXRlRG9jdW1lbnQiLCJkb2N1bWVudCIsInVwZGF0ZURvY3VtZW50TW9kZWwiLCJmaWxlIiwibW9kYWwiLCJyZW1vdmVEb2N1bWVudEluRm9ybSIsImluZGV4Iiwic3BsaWNlIiwiYWRkRG9jdW1lbnRSZXNldEZvcm0iLCJhZGREb2N1bWVudEZvcm0iLCIkc2V0UHJpc3RpbmUiLCJ1cGRhdGVEb2N1bWVudFJlc2V0Rm9ybSIsImFkZERvY3VtZW50Q2FuY2VsIiwidXBsb2FkU2luZ2xlRmlsZSIsInN0YXR1cyIsInVwbG9hZFByb2dyZXNzIiwidGhlbiIsInJlc29sdmUiLCJ1cGxvYWRGaWxlcyIsInF1ZXVlIiwibWFwIiwiYmluZCIsInJlZHVjZSIsInByb21pc2UiLCJmdW5jIiwiQXJyYXkiLCJwcm90b3R5cGUiLCJjb25jYXQiLCJyZXN1bHQiLCJhZGREb2N1bWVudFNhdmUiLCJkaXIiLCJ1cGRhdGVEb2N1bWVudENhbmNlbCIsInVwZGF0ZURvY3VtZW50U2F2ZSIsImNvbW1lbnQiLCJlZGl0RG9jdW1lbnRDYW5jZWwiLCJlZGl0RG9jdW1lbnRSZXNldEZvcm0iLCJlZGl0RG9jdW1lbnRTYXZlIiwiY2F0ZWdvcmllcyIsInNsdWciLCJkb2N1bWVudHMiLCJpc0N1c3RvbSIsIm5ld0NoaWxkcmVuQ291bnQiLCJpY29uIiwiaXNQcml2YXRlIiwiaXNOZXciLCJpc1NwaUZvbGRlciIsImZvbGRlciIsImNhdGVnb3J5Q291bnQiLCJhY3RpdmVDYXRlZ29yeSIsImFjdGl2ZUNhdGVnb3JpZXMiLCJpbmNyZW1lbnRDYXRlZ29yeUluZGV4IiwiZ2V0Q2F0ZWdvcnlJbmRleCIsImFyciIsImluZGV4T2YiLCJnZXRQYXJlbnRDYXRlZ29yeUJ5U2x1ZyIsImZpbmQiLCJjIiwib3BlbkNhdGVnb3J5Iiwic2VsZWN0Q2F0ZWdvcnkiLCJzZWxlY3RlZENhdGVnb3J5Iiwib3BlbkRvY3VtZW50Iiwib2JqIiwiYWN0aXZlIiwiY2xvc2VEb2N1bWVudCIsInNlbGVjdERvY3VtZW50Iiwic2VsZWN0ZWREb2N1bWVudCIsInJlcyIsImlzc3VlcyIsImNoYW5nZVJlcXVlc3RzIiwibWlsZXN0b25lcyIsImNoZWNrbGlzdEdyb3VwcyIsImFsbENoZWNrbGlzdHMiLCJncm91cCIsImNoZWNrbGlzdHMiLCJhIiwiYiIsImNoZWNrbGlzdCIsIml0ZW1zQ29tcGxldGVkIiwiaXRlbXMiLCJpdGVtc1RvdGFsIiwiYWxsQ2hlY2tsaXN0c0NvbXBsZXRlZCIsImNoZWNrbGlzdHNJbkdyb3VwIiwiY2xlYW5Hcm91cCIsImNvcHkiLCJvcGVuSXNzdWVzQ291bnQiLCJpIiwidXBkYXRlRGF0ZXMiLCJjaGVja0luIiwiZGF0ZUZyb20iLCJkYXkiLCJzZXRIb3VycyIsImRhdGVUb0lzbyIsImRhdGVUbyIsInNsaWNlIiwidG9JU09TdHJpbmciLCJjaGVja2lucyIsInVzZXJzIiwic2VhcmNoQ2hlY2tsaXN0SXRlbXMiLCJxdWVyeSIsImNoZWNrbGlzdEl0ZW1zRmlsdGVyZWRDb3VudCIsImZsYXR0ZW5lZCIsIm9wZW5GaWx0ZXJJc3N1ZXNNb2RhbCIsImFkZElzc3VlIiwiYWN0aXZlSXNzdWUiLCJhZGRDaGFuZ2VSZXF1ZXN0TW9kZWwiLCJhZGRDaGFuZ2VSZXF1ZXN0TW9kZWxUZW1wIiwiYWRkSXNzdWVNb2RlbCIsImFkZElzc3VlRmlsZSIsInJlc2V0QWRkSXNzdWVGb3JtIiwiYWRkSXNzdWVGb3JtIiwiYWRkSXNzdWVDYW5jZWwiLCJhZGRJc3N1ZVNhdmUiLCJvcGVuSXNzdWUiLCJjbG9zZUlzc3VlIiwic2Nyb2xsVG9Cb3R0b20iLCJhZGRDaGFuZ2VSZXF1ZXN0IiwibW9kZWwiLCJyZW1vdmVDaGFuZ2VSZXF1ZXN0IiwiZWxlbSIsImdldEVsZW1lbnRCeUlkIiwic2Nyb2xsVG9wIiwic2Nyb2xsSGVpZ2h0IiwicmFuZCIsImdlbmVyYXRlQXZhdGFyUGxhY2Vob2xkZXJJbmRleCIsInJhbmRvbSIsImdldEF2YXRhclBsYWNlaG9sZGVySW5kZXgiLCJ0b2RheSIsImNoZWNraW5MaXN0TW9udGgiLCJnZXRGdWxsWWVhciIsImdldE1vbnRoIiwiYWRkQ2hlY2tpbk1vZGVsIiwiZ2V0RGF0ZSJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7QUFFQSxJQUFJQSxjQUFjQyxRQUFRQyxNQUFSLENBQWUsS0FBZixFQUFzQixDQUN0QyxXQURzQyxFQUV0QyxXQUZzQyxFQUd0QyxjQUhzQyxFQUl0QyxnQkFKc0MsRUFLdEMsV0FMc0MsRUFNdEMsYUFOc0MsRUFPdEMsZ0JBUHNDLEVBUXRDLGVBUnNDLENBQXRCLENBQWxCOztBQVdBRixZQUFZRyxPQUFaLENBQW9CLGlCQUFwQixFQUF1QyxVQUFTQyxLQUFU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QUl4TSxJQUFKLENBQVN1TSxNQUFNRSxXQUFOLEVBQVQsRUFBOEJGLE1BQU1HLFFBQU4sRUFBOUIsRUFBZ0QsQ0FBaEQsRUFBbUQsQ0FBbkQsRUFBc0QsQ0FBdEQsRUFBeUQsQ0FBekQsQ0FBMUI7QUFDQXpOLFNBQU8wTixlQUFQLEdBQXlCO0FBQ3ZCMUMsY0FBVSxJQUFJakssSUFBSixDQUFTdU0sTUFBTUUsV0FBTixFQUFULEVBQThCRixNQUFNRyxRQUFOLEVBQTlCLEVBQWdESCxNQUFNSyxPQUFOLEVBQWhELEVBQWlFLENBQWpFLEVBQW9FLENBQXBFLEVBQXVFLENBQXZFLENBRGE7QUFFdkJ2QyxZQUFRLElBQUlySyxJQUFKLENBQVN1TSxNQUFNRSxXQUFOLEVBQVQsRUFBOEJGLE1BQU1HLFFBQU4sRUFBOUIsRUFBZ0RILE1BQU1LLE9BQU4sRUFBaEQsRUFBaUUsRUFBakUsRUFBcUUsQ0FBckUsRUFBd0UsQ0FBeEU7QUFGZSxHQUF6QjtBQUtELENBN25CRCIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbnZhciBCeWdnZW1BcHBlbiA9IGFuZ3VsYXIubW9kdWxlKCdhcHAnLCBbXG4gICduZ0FuaW1hdGUnLFxuICAndWkuc2VsZWN0JyxcbiAgJ25nRmlsZVVwbG9hZCcsXG4gICdtZ2NyZWEubmdTdHJhcCcsXG4gICdobC5zdGlja3knLFxuICAnbmdUYWdzSW5wdXQnLFxuICAnYW5ndWxhci5maWx0ZXInLFxuICAnYW5ndWxhck1vbWVudCdcbl0pO1xuXG5CeWdnZW1BcHBlbi5mYWN0b3J5KCdkb2N1bWVudEZhY3RvcnknLCBmdW5jdGlvbigkaHR0cCkge1xuICByZXR1cm4gJGh0dHAuZ2V0KCcvYXNzZXRzL2pzL2RhdGEvZG9jdW1lbnRzLmpzb24nKTtcbn0pO1xuXG5CeWdnZW1BcHBlbi5mYWN0b3J5KCdpc3N1ZUZhY3RvcnknLCBmdW5jdGlvbigkaHR0cCkge1xuICByZXR1cm4gJGh0dHAuZ2V0KCcvYXNzZXRzL2pzL2RhdGEvaXNzdWVzLmpzb24nKTtcbn0pO1xuXG5CeWdnZW1BcHBlbi5mYWN0b3J5KCdjaGFuZ2VSZXF1ZXN0RmFjdG9yeScsIGZ1bmN0aW9uKCRodHRwKSB7XG4gIHJldHVybiAkaHR0cC5nZXQoJy9hc3NldHMvanMvZGF0YS9jaGFuZ2UtcmVxdWVzdHMuanNvbicpO1xufSk7XG5cbkJ5Z2dlbUFwcGVuLmZhY3RvcnkoJ21pbGVzdG9uZXNGYWN0b3J5JywgZnVuY3Rpb24oJGh0dHApIHtcbiAgcmV0dXJuICRodHRwLmdldCgnL2Fzc2V0cy9qcy9kYXRhL21pbGVzdG9uZXMuanNvbicpO1xufSk7XG5cbkJ5Z2dlbUFwcGVuLmZhY3RvcnkoJ2NoZWNrbGlzdHNGYWN0b3J5JywgZnVuY3Rpb24oJGh0dHApIHtcbiAgcmV0dXJuICRodHRwLmdldCgnL2Fzc2V0cy9qcy9kYXRhL2NoZWNrbGlzdHNfZXh0Lmpzb24nKTtcbn0pO1xuXG5CeWdnZW1BcHBlbi5mYWN0b3J5KCdjaGVja2luc0ZhY3RvcnknLCBmdW5jdGlvbigkaHR0cCkge1xuICByZXR1cm4gJGh0dHAuZ2V0KCcvYXNzZXRzL2pzL2RhdGEvY2hlY2tpbnMuanNvbicpO1xufSk7XG5cbkJ5Z2dlbUFwcGVuLmZhY3RvcnkoJ3VzZXJzRmFjdG9yeScsIGZ1bmN0aW9uKCRodHRwKSB7XG4gIHJldHVybiAkaHR0cC5nZXQoJy9hc3NldHMvanMvZGF0YS91c2Vycy5qc29uJyk7XG59KTtcblxuQnlnZ2VtQXBwZW4uY29uZmlnKGZ1bmN0aW9uKCRpbnRlcnBvbGF0ZVByb3ZpZGVyKSB7XG4gICRpbnRlcnBvbGF0ZVByb3ZpZGVyLnN0YXJ0U3ltYm9sKCd7W3snKTtcbiAgJGludGVycG9sYXRlUHJvdmlkZXIuZW5kU3ltYm9sKCd9XX0nKTtcbn0pO1xuXG4vLyBGaXggY2xlYXIgYnV0dG9uIGluIHVpLXNlbGVjdFxuLy8gT3ZlcnJpZGUgdWktc2VsZWN0IGJvb3RzdHJhcCB0aGVtZVxuQnlnZ2VtQXBwZW4ucnVuKGZ1bmN0aW9uKCR0ZW1wbGF0ZUNhY2hlKSB7XG4gIC8qIGVzbGludC1kaXNhYmxlIG1heC1sZW4gKi9cbiAgJHRlbXBsYXRlQ2FjaGUucHV0KCdib290c3RyYXAvbWF0Y2gudHBsLmh0bWwnLCBgXG4gIDxkaXYgY2xhc3M9XCJ1aS1zZWxlY3QtbWF0Y2hcIiBuZy1oaWRlPVwiJHNlbGVjdC5vcGVuICYmICRzZWxlY3Quc2VhcmNoRW5hYmxlZFwiIG5nLWRpc2FibGVkPVwiJHNlbGVjdC5kaXNhYmxlZFwiIG5nLWNsYXNzPVwieydidG4tZGVmYXVsdC1mb2N1cyc6JHNlbGVjdC5mb2N1c31cIj5cbiAgICA8c3BhbiB0YWJpbmRleD1cIi0xXCIgY2xhc3M9XCJidG4gYnRuLWRlZmF1bHQgZm9ybS1jb250cm9sIHVpLXNlbGVjdC10b2dnbGVcIiBhcmlhLWxhYmVsPVwie3sgJHNlbGVjdC5iYXNlVGl0bGUgfX0gYWN0aXZhdGVcIiBuZy1kaXNhYmxlZD1cIiRzZWxlY3QuZGlzYWJsZWRcIiBuZy1jbGljaz1cIiRzZWxlY3QuYWN0aXZhdGUoKVwiIHN0eWxlPVwib3V0bGluZTogMDtcIj5cbiAgICAgIDxzcGFuIG5nLXNob3c9XCIkc2VsZWN0LmlzRW1wdHkoKVwiIGNsYXNzPVwidWktc2VsZWN0LXBsYWNlaG9sZGVyIHRleHQtbXV0ZWRcIj57eyRzZWxlY3QucGxhY2Vob2xkZXJ9fTwvc3Bhbj4gXG4gICAgICA8c3BhbiBuZy1oaWRlPVwiJHNlbGVjdC5pc0VtcHR5KClcIiBjbGFzcz1cInVpLXNlbGVjdC1tYXRjaC10ZXh0IHB1bGwtbGVmdFwiIG5nLWNsYXNzPVwieyd1aS1zZWxlY3QtYWxsb3ctY2xlYXInOiAkc2VsZWN0LmFsbG93Q2xlYXIgJiYgISRzZWxlY3QuaXNFbXB0eSgpfVwiIG5nLXRyYW5zY2x1ZGU9XCJcIj48L3NwYW4+IFxuICAgICAgPGkgY2xhc3M9XCJjYXJldCBwdWxsLXJpZ2h0XCIgbmctY2xpY2s9XCIkc2VsZWN0LnRvZ2dsZSgkZXZlbnQpXCI+PC9pPiBcbiAgICAgIDxhIG5nLXNob3c9XCIkc2VsZWN0LmFsbG93Q2xlYXIgJiYgISRzZWxlY3QuaXNFbXB0eSgpICYmICgkc2VsZWN0LmRpc2FibGVkICE9PSB0cnVlKVwiIGFyaWEtbGFiZWw9XCJ7eyAkc2VsZWN0LmJhc2VUaXRsZSB9fSBjbGVhclwiIG5nLWNsaWNrPVwiJHNlbGVjdC5jbGVhcigkZXZlbnQpXCIgY2xhc3M9XCJidG4gYnRuLXhzIGJ0bi1saW5rIHB1bGwtcmlnaHRcIj5cbiAgICAgICAgICA8c3BhbiBjbGFzcz1cImZhIGZhLXJlbW92ZVwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvc3Bhbj5cbiAgICAgIDwvYT5cbiAgICA8L3NwYW4+XG4gIDwvZGl2PlxuICBgKTtcbn0pO1xuXG5CeWdnZW1BcHBlbi5maWx0ZXIoJ2NhcGl0YWxpemUnLCBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKHMpIHtcbiAgICByZXR1cm4gKGFuZ3VsYXIuaXNTdHJpbmcocykgJiYgcy5sZW5ndGggPiAwKSA/IHNbMF0udG9VcHBlckNhc2UoKSArIHMuc3Vic3RyKDEpLnRvTG93ZXJDYXNlKCkgOiBzO1xuICB9O1xufSk7XG5cbkJ5Z2dlbUFwcGVuLmZpbHRlcignZmlsZXNpemUnLCBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoc2l6ZSkge1xuICAgIGlmIChpc05hTihzaXplKSkgeyBzaXplID0gMDsgfVxuXG4gICAgaWYgKHNpemUgPCAxMDI0KSB7IHJldHVybiBzaXplICsgJyBCJzsgfVxuXG4gICAgc2l6ZSAvPSAxMDI0O1xuXG4gICAgaWYgKHNpemUgPCAxMDI0KSB7IHJldHVybiBzaXplLnRvRml4ZWQoMikgKyAnIEtiJzsgfVxuXG4gICAgc2l6ZSAvPSAxMDI0O1xuXG4gICAgaWYgKHNpemUgPCAxMDI0KSB7IHJldHVybiBzaXplLnRvRml4ZWQoMikgKyAnIE1iJzsgfVxuXG4gICAgc2l6ZSAvPSAxMDI0O1xuXG4gICAgaWYgKHNpemUgPCAxMDI0KSB7IHJldHVybiBzaXplLnRvRml4ZWQoMikgKyAnIEdiJzsgfVxuXG4gICAgc2l6ZSAvPSAxMDI0O1xuXG4gICAgcmV0dXJuIHNpemUudG9GaXhlZCgyKSArICcgVGInO1xuICB9O1xufSk7XG5cbkJ5Z2dlbUFwcGVuLmZpbHRlcignc3VtT2ZWYWx1ZScsIGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIChkYXRhLCBrZXkpIHtcbiAgICBpZiAoYW5ndWxhci5pc1VuZGVmaW5lZChkYXRhKSB8fCBhbmd1bGFyLmlzVW5kZWZpbmVkKGtleSkpIHtcbiAgICAgIHJldHVybiAwO1xuICAgIH1cbiAgICBsZXQgc3VtID0gMDtcblxuICAgIGFuZ3VsYXIuZm9yRWFjaChkYXRhLGZ1bmN0aW9uKHZhbHVlKXtcbiAgICAgIHN1bSA9IHN1bSArIHBhcnNlSW50KHZhbHVlW2tleV0sIDEwKTtcbiAgICB9KTtcbiAgICByZXR1cm4gc3VtO1xuICB9O1xufSk7XG5CeWdnZW1BcHBlbi5maWx0ZXIoJ2Fic29sdXRlJywgZnVuY3Rpb24oKSB7XG4gIHJldHVybiBmdW5jdGlvbihpbnB1dCkge1xuICAgIHJldHVybiBNYXRoLmFicyhpbnB1dCk7XG4gIH07XG59KTtcbkJ5Z2dlbUFwcGVuLmRpcmVjdGl2ZSgnc2lnbicsIGZ1bmN0aW9uKCkge1xuICByZXR1cm4ge1xuICAgIHNjb3BlOiB7XG4gICAgICB2YWx1ZTogJz0nXG4gICAgfSxcbiAgICB0ZW1wbGF0ZTogJzxzcGFuIG5nLWlmPVwidmFsdWUhPT0wXCIgbmctc3dpdGNoPVwidmFsdWU+PTBcIj48c3BhbiBuZy1zd2l0Y2gtd2hlbj1cInRydWVcIj4mcGx1czs8L3NwYW4+J1xuICAgICsgJzxzcGFuIG5nLXN3aXRjaC13aGVuPVwiZmFsc2VcIj4mbWludXM7PC9zcGFuPjwvc3Bhbj4nXG4gIH07XG59KTtcbkJ5Z2dlbUFwcGVuLmZpbHRlcignZm9ybWF0UGx1c01pbnVzJywgZnVuY3Rpb24gKCkge1xuICByZXR1cm4gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgaWYgKGFuZ3VsYXIuaXNVbmRlZmluZWQodmFsdWUpKSB7XG4gICAgICByZXR1cm4gJyc7XG4gICAgfVxuICAgIGlmICh2YWx1ZVswXT09PScwJykge1xuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH0gZWxzZSBpZiAodmFsdWVbMF09PT0nLScpIHtcbiAgICAgIHJldHVybiAnJm1pbnVzOyAnK3ZhbHVlO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gJy8wMDJCICcrdmFsdWU7XG4gICAgfVxuICB9O1xufSk7XG5CeWdnZW1BcHBlbi5maWx0ZXIoJ21pbnV0ZXNUb0hvdXJzJywgZnVuY3Rpb24oKSB7XG5cbiAgZnVuY3Rpb24gcGFkKG51bSA9IDAsIHNpemUpIHtcbiAgICB2YXIgcyA9IG51bSArICcnO1xuXG4gICAgd2hpbGUgKHMubGVuZ3RoIDwgc2l6ZSkge1xuICAgICAgcyA9ICcwJyArIHM7XG4gICAgfVxuICAgIHJldHVybiBzO1xuICB9XG5cbiAgcmV0dXJuIGZ1bmN0aW9uKHRvdGFsTWludXRlcyA9IDApIHtcbiAgICB2YXIgaG91cnMgPSBNYXRoLmZsb29yKHRvdGFsTWludXRlcyAvIDYwKTtcbiAgICB2YXIgbWludXRlcyA9IHRvdGFsTWludXRlcyAtIChob3VycyAqIDYwKTtcblxuICAgIHJldHVybiBob3VycyArICc6JyArIHBhZChtaW51dGVzLCAyKTtcbiAgfTtcbn0pO1xuXG5CeWdnZW1BcHBlbi5jb250cm9sbGVyKCdCeWdnZW1BcHBlbkNvbnRyb2xsZXInLCBmdW5jdGlvbiAoXG4gICRzY29wZSwgJHRpbWVvdXQsICR3aW5kb3csICRzY2UsXG4gIGRvY3VtZW50RmFjdG9yeSwgaXNzdWVGYWN0b3J5LCBjaGFuZ2VSZXF1ZXN0RmFjdG9yeSwgbWlsZXN0b25lc0ZhY3RvcnksIGNoZWNrbGlzdHNGYWN0b3J5LCBjaGVja2luc0ZhY3RvcnksXG4gIHVzZXJzRmFjdG9yeSwgJHEsICRpbnRlcnZhbCwgJGh0dHAsICR0ZW1wbGF0ZUNhY2hlXG4pIHtcblxuICAkc2NvcGUubW9ja0RhdGEgPSB7fTtcblxuICAkc2NvcGUuZGF0ZSA9IG5ldyBEYXRlKCk7XG5cbiAgY29uc3QgbW9ja1RhZ3MgPSBbXG4gICAgeyB0ZXh0OiAnTG9yZW0nIH0sXG4gICAgeyB0ZXh0OiAnSXBzdW0nIH0sXG4gICAgeyB0ZXh0OiAnRG9sb3InIH0sXG4gICAgeyB0ZXh0OiAnU2l0IGFtZXQnIH0sXG4gICAgeyB0ZXh0OiAnQWRpcGlzY2luZycgfSxcbiAgICB7IHRleHQ6ICdFbGl0JyB9XG4gIF07XG5cbiAgJHNjb3BlLmxvYWRUYWdzID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIG1vY2tUYWdzO1xuICB9O1xuXG4gICAgLyoqXG4gICAgICogTWFpbiBhcHAgY29udHJvbGxlciBkdW1teS5cbiAgICAgKi9cblxuICAkc2NvcGUuZ3JlYXRlclRoYW5PckVxdWFsID0gZnVuY3Rpb24ocHJvcCwgdmFsKXtcbiAgICByZXR1cm4gZnVuY3Rpb24oaXRlbSl7XG4gICAgICByZXR1cm4gaXRlbVtwcm9wXSA+PSB2YWw7XG4gICAgfTtcbiAgfTtcbiAgJHNjb3BlLmxlc3NUaGFuID0gZnVuY3Rpb24ocHJvcCwgdmFsKXtcbiAgICByZXR1cm4gZnVuY3Rpb24oaXRlbSl7XG4gICAgICByZXR1cm4gaXRlbVtwcm9wXSA8IHZhbDtcbiAgICB9O1xuICB9O1xuXG4gICRzY29wZS50cnVzdEFzSHRtbCA9IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgcmV0dXJuICRzY2UudHJ1c3RBc0h0bWwodmFsdWUpO1xuICB9O1xuICAkc2NvcGUudHJ1c3RTcmMgPSBmdW5jdGlvbihzcmMpIHtcbiAgICByZXR1cm4gJHNjZS50cnVzdEFzUmVzb3VyY2VVcmwoc3JjKTtcbiAgfTtcblxuICAkc2NvcGUubG9naW4gPSAoZW1haWwsIHBhc3N3b3JkLCBwYXRoKSA9PiB7XG4gICAgJHNjb3BlLmxvZ2luUGVuZGluZyA9IHRydWU7XG4gICAgJHRpbWVvdXQoKCk9PntcblxuICAgICAgaWYoZW1haWwgPT09ICdhZG1pbkB6YXZlbi5jbycgJiYgcGFzc3dvcmQgPT09ICdwYXNzd29yZCcpIHtcbiAgICAgICAgJHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gcGF0aDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGVtYWlsICsgJyAvICcgKyBwYXNzd29yZCk7XG4gICAgICAgICRzY29wZS5sb2dpblBlbmRpbmcgPSBmYWxzZTtcbiAgICAgICAgJHNjb3BlLmxvZ2luRXJyb3JNZXNzYWdlID0gJ1dyb25nIGxvZ2luIG9yIHBhc3N3b3JkJztcbiAgICAgIH1cblxuICAgIH0sMjAwMCk7XG4gIH07XG5cbiAgJHNjb3BlLmVkaXRQcm9qZWN0Q2hhbmdlcyA9IHtcbiAgICBjdXJyZW50SW1hZ2U6IHRydWUsXG4gICAgbmV3SW1hZ2U6IGZhbHNlLFxuICAgIHJlbW92ZUN1cnJlbnRJbWFnZTogZnVuY3Rpb24oKSB7XG4gICAgICAkc2NvcGUuZWRpdFByb2plY3RDaGFuZ2VzLmN1cnJlbnRJbWFnZSA9IGZhbHNlO1xuICAgICAgJHNjb3BlLmVkaXRQcm9qZWN0Q2hhbmdlcy5uZXdJbWFnZSA9IGZhbHNlO1xuICAgIH0sXG4gICAgcmVzdG9yZUN1cnJlbnRJbWFnZTogZnVuY3Rpb24oKSB7XG4gICAgICAkc2NvcGUuZWRpdFByb2plY3RDaGFuZ2VzLmN1cnJlbnRJbWFnZSA9IHRydWU7XG4gICAgICAkc2NvcGUuZWRpdFByb2plY3RDaGFuZ2VzLm5ld0ltYWdlID0gZmFsc2U7XG4gICAgfSxcbiAgICByZXBsYWNlQ3VycmVudEltYWdlOiBmdW5jdGlvbigpIHtcbiAgICAgICRzY29wZS5lZGl0UHJvamVjdENoYW5nZXMuY3VycmVudEltYWdlID0gZmFsc2U7XG4gICAgICAkc2NvcGUuZWRpdFByb2plY3RDaGFuZ2VzLm5ld0ltYWdlID0gdHJ1ZTtcbiAgICB9LFxuICB9O1xuXG4gICRzY29wZS5lZGl0UHJvamVjdEdyb3VwID0ge1xuICAgIG5hbWU6ICdMb3JlbSBpcHN1bSBkb2xvcicsXG4gICAgcGFyZW50OiAnMDAxJ1xuICB9O1xuXG4gICRzY29wZS5lZGl0UHJvamVjdCA9IHtcbiAgICBuYW1lOiAnS1MgwqtOb3JnZcK7JyxcbiAgICBtbXNpOiAnMjU3MDAxMDAwJyxcbiAgICBpbnRlcm5hbE51bWJlcjogJ0pEUzY0My00NTIvMTIzSycsXG4gICAgaW1hZ2VTbWFsbFVybDogJ3Byb2plY3Rfa3Nub3JnZS5qcGcnLFxuICAgIGtlZXBDdXJyZW50SW1hZ2U6IHRydWUsXG4gICAgc2V0dGluZ3M6IHtcbiAgICAgIGhpZGVTcGVjdGF0b3JzRnJvbUVhY2hPdGhlcjogZmFsc2UsXG4gICAgfSxcbiAgICBncm91cElkOiAnMDAxJyxcbiAgICBzaXplOiAyLFxuICAgIHRhZ3M6IFtcbiAgICAgIHsgdGV4dDogJ0xvcmVtJyB9LFxuICAgICAgeyB0ZXh0OiAnSXBzdW0nIH0sXG4gICAgICB7IHRleHQ6ICdEb2xvcicgfVxuICAgIF0sXG4gICAgbW9kdWxlQ2hlY2tsaXN0czogdHJ1ZSxcbiAgICBtb2R1bGVNaWxlc3RvbmVzOiB0cnVlLFxuICAgIG1vZHVsZUNoZWNraW5zOiBmYWxzZSxcbiAgfTtcblxuICAkc2NvcGUucHJvamVjdEdyb3VwcyA9IFtcbiAgICB7XG4gICAgICBuYW1lOiAnTG9yZW0gaXBzdW0nLFxuICAgICAgaWQ6ICcwMDEnLFxuICAgICAgcGFyZW50OiBudWxsLFxuICAgICAgbGV2ZWw6IDBcbiAgICB9LFxuICAgIHtcbiAgICAgIG5hbWU6ICdOb21pbmF0dXInLFxuICAgICAgaWQ6ICcwMDQnLFxuICAgICAgcGFyZW50OiAnMDAxJyxcbiAgICAgIGxldmVsOiAxXG4gICAgfSxcbiAgICB7XG4gICAgICBuYW1lOiAnTmVyb21hbnN0ZXInLFxuICAgICAgaWQ6ICcwMDYnLFxuICAgICAgcGFyZW50OiAnMDA0JyxcbiAgICAgIGxldmVsOiAyXG4gICAgfSxcbiAgICB7XG4gICAgICBuYW1lOiAnQ3Jlc2NlbmR1bScsXG4gICAgICBpZDogJzAwNScsXG4gICAgICBwYXJlbnQ6ICcwMDEnLFxuICAgICAgbGV2ZWw6IDFcbiAgICB9LFxuICAgIHtcbiAgICAgIG5hbWU6ICdEb2xvciBzaXQgYW1ldCcsXG4gICAgICBpZDogJzAwMicsXG4gICAgICBwYXJlbnQ6IG51bGwsXG4gICAgICBsZXZlbDogMFxuICAgIH0sXG4gICAge1xuICAgICAgbmFtZTogJ0FkaXBpc2NpbmcgZWxpdCcsXG4gICAgICBpZDogJzAwMycsXG4gICAgICBwYXJlbnQ6IG51bGwsXG4gICAgICBsZXZlbDogMFxuICAgIH1cbiAgXTtcblxuICAkc2NvcGUuYmlsbGluZ0FkZHJlc3MgPSB7XG4gICAgY29tcGFueU5hbWU6ICdaYXZlbiBTcC4geiBvLm8uJyxcbiAgICBzdHJlZXQ6ICd1bC4gS2llxYJjem93c2thIDcwJyxcbiAgICBjaXR5OiAnV3JvY8WCYXcnLFxuICAgIGNvZGU6ICc1MS0zNTQnLFxuICAgIGNvdW50cnk6ICdQb2xhbmQnLFxuICAgIHRheElkOiAnMTIzODc1MzI0Mjk4NzY1JyxcbiAgICBmaXJzdE5hbWU6ICdLbGF1cycsXG4gICAgbGFzdE5hbWU6ICdNdXN0ZXJtYW5uJyxcbiAgICBlbWFpbDogJ2tsYXVzLm11c3Rlcm1hbm5Abm9yZGJvaHVzLmNvbScsXG4gICAgcGhvbmU6ICcrNDggMTIzNDU2Nzg5J1xuICB9O1xuXG4gICRzY29wZS5wcm9qZWN0c1ZpZXcgPSB7XG4gICAgc3R5bGU6ICd0aWxlcydcbiAgfTtcblxuICAkc2NvcGUucHJvamVjdFJvbGVzID0gW1xuICAgIHtcbiAgICAgIHRpdGxlOiAnUHJvamVjdCBNYW5hZ2VyJyxcbiAgICAgIHN0dWI6ICdwcm9qZWN0bWFuYWdlcidcbiAgICB9LFxuICAgIHtcbiAgICAgIHRpdGxlOiAnQ2xpZW50JyxcbiAgICAgIHN0dWI6ICdjbGllbnQnXG4gICAgfSxcbiAgICB7XG4gICAgICB0aXRsZTogJ0NyZXcnLFxuICAgICAgc3R1YjogJ2NyZXcnXG4gICAgfSxcbiAgICB7XG4gICAgICB0aXRsZTogJ0NvbnRyYWN0b3InLFxuICAgICAgc3R1YjogJ2NvbnRyYWN0b3InXG4gICAgfSxcbiAgICB7XG4gICAgICB0aXRsZTogJ1NwZWN0YXRvcicsXG4gICAgICBzdHViOiAnc3BlY3RhdG9yJ1xuICAgIH1cbiAgXTtcblxuICAkc2NvcGUuYWRkRG9jdW1lbnQgPSBmdW5jdGlvbihmaWxlcywgY2F0LCBmb3JjZSA9IGZhbHNlKSB7XG5cbiAgICBpZihmaWxlcy5sZW5ndGg+MCkge1xuICAgICAgJHNjb3BlLmFjdGl2ZURvY3VtZW50ID0gbnVsbDtcblxuICAgICAgaWYgKCFhbmd1bGFyLmlzRGVmaW5lZCgkc2NvcGUuYWRkRG9jdW1lbnRNb2RlbCkgfHwgZm9yY2UpIHtcbiAgICAgICAgJHNjb3BlLmFkZERvY3VtZW50TW9kZWwgPSB7XG4gICAgICAgICAgZmlsZXM6IFtdLFxuICAgICAgICAgIGNhdGVnb3J5OiBjYXQgfHwgJ290aGVyJ1xuICAgICAgICB9O1xuICAgICAgfVxuXG4gICAgICAkc2NvcGUuYWRkRG9jdW1lbnRNb2RlbC5maWxlcy5wdXNoKC4uLmZpbGVzKTtcblxuICAgICAgaWYgKGZpbGVzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAkdGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAgICRzY29wZS5hZGREb2N1bWVudE1vZGVsLm5hbWUgPSBmaWxlc1swXS5uYW1lO1xuICAgICAgICAgIGFuZ3VsYXIuZWxlbWVudCgnI2FkZGRvY3VtZW50LWZvcm0tbmFtZScpLmZvY3VzKCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICAkc2NvcGUudXBkYXRlRG9jdW1lbnQgPSBmdW5jdGlvbihmaWxlcywgZG9jdW1lbnQpIHtcbiAgICBpZihmaWxlcy5sZW5ndGg+MCkge1xuICAgICAgJHNjb3BlLnVwZGF0ZURvY3VtZW50TW9kZWwgPSB7XG4gICAgICAgIGZpbGU6IGZpbGVzWzBdLFxuICAgICAgICBpZDogZG9jdW1lbnQuaWRcbiAgICAgIH07XG4gICAgICBhbmd1bGFyLmVsZW1lbnQoJyN1cGRhdGUtZG9jdW1lbnQtbW9kYWwnKS5tb2RhbCgnc2hvdycpO1xuICAgIH1cbiAgfTtcblxuICAkc2NvcGUucmVtb3ZlRG9jdW1lbnRJbkZvcm0gPSBmdW5jdGlvbihpbmRleCkge1xuICAgICRzY29wZS5hZGREb2N1bWVudE1vZGVsLmZpbGVzLnNwbGljZShpbmRleCwgMSk7XG5cbiAgICBpZiAoJHNjb3BlLmFkZERvY3VtZW50TW9kZWwuZmlsZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAkc2NvcGUuYWRkRG9jdW1lbnRSZXNldEZvcm0oKTtcbiAgICB9XG5cbiAgICBpZiAoJHNjb3BlLmFkZERvY3VtZW50TW9kZWwuZmlsZXMubGVuZ3RoID09PSAxKSB7XG4gICAgICAkc2NvcGUuYWRkRG9jdW1lbnRNb2RlbC5uYW1lID0gJHNjb3BlLmFkZERvY3VtZW50TW9kZWwuZmlsZXNbMF0ubmFtZTtcbiAgICB9XG4gIH07XG5cbiAgJHNjb3BlLmFkZERvY3VtZW50UmVzZXRGb3JtID0gZnVuY3Rpb24oKSB7XG4gICAgZGVsZXRlICRzY29wZS5hZGREb2N1bWVudE1vZGVsO1xuICAgICRzY29wZS5hZGREb2N1bWVudEZvcm0uJHNldFByaXN0aW5lKCk7XG4gIH07XG5cbiAgJHNjb3BlLnVwZGF0ZURvY3VtZW50UmVzZXRGb3JtID0gZnVuY3Rpb24oKSB7XG4gICAgZGVsZXRlICRzY29wZS51cGRhdGVEb2N1bWVudE1vZGVsO1xuICAgIC8vICRzY29wZS51cGRhdGVEb2N1bWVudEZvcm0uJHNldFByaXN0aW5lKCk7XG4gIH07XG5cbiAgJHNjb3BlLmFkZERvY3VtZW50Q2FuY2VsID0gZnVuY3Rpb24oKSB7XG4gICAgY29uc29sZS5sb2coJ0RvY3VtZW50IG5vdCBhZGRlZCcpO1xuICAgIGRlbGV0ZSAkc2NvcGUuYWRkRG9jdW1lbnRNb2RlbDtcbiAgICAkc2NvcGUuYWRkRG9jdW1lbnRSZXNldEZvcm0oKTtcbiAgfTtcblxuICBjb25zdCB1cGxvYWRTaW5nbGVGaWxlID0gZnVuY3Rpb24oZmlsZSkge1xuICAgIHJldHVybiAkcShyZXNvbHZlID0+IHtcbiAgICAgIGZpbGUuc3RhdHVzID0gJ3VwbG9hZGluZyc7XG4gICAgICBmaWxlLnVwbG9hZFByb2dyZXNzID0gMDtcblxuICAgICAgJGludGVydmFsKCgpID0+IGZpbGUudXBsb2FkUHJvZ3Jlc3MrKywgMjAsIDEwMCkudGhlbigoKSA9PiB7XG4gICAgICAgIGZpbGUuc3RhdHVzID0gJ2RvbmUnO1xuICAgICAgICBjb25zb2xlLmxvZygndXBsb2FkZWQgJyArIGZpbGUubmFtZSk7XG4gICAgICAgIHJlc29sdmUoKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9O1xuXG4gIGNvbnN0IHVwbG9hZEZpbGVzID0gZnVuY3Rpb24oZmlsZXMpIHtcbiAgICBjb25zdCBxdWV1ZSA9IGZpbGVzLm1hcChmaWxlID0+IHVwbG9hZFNpbmdsZUZpbGUuYmluZChudWxsLCBmaWxlKSk7XG5cbiAgICAkc2NvcGUuYWRkRG9jdW1lbnRNb2RlbC5maWxlcy5mb3JFYWNoKGZpbGUgPT4ge1xuICAgICAgZmlsZS5zdGF0dXMgPSAnd2FpdGluZyc7XG4gICAgfSk7XG4gICAgcXVldWUucmVkdWNlKChwcm9taXNlLCBmdW5jKSA9PlxuICAgICAgcHJvbWlzZS50aGVuKHJlc3VsdCA9PiBmdW5jKCkudGhlbihBcnJheS5wcm90b3R5cGUuY29uY2F0LmJpbmQocmVzdWx0KSkpLFxuICAgICAgJHEucmVzb2x2ZShbXSkpO1xuICB9O1xuXG4gICRzY29wZS5hZGREb2N1bWVudFNhdmUgPSBmdW5jdGlvbigpIHtcbiAgICBpZiAoJHNjb3BlLmFkZERvY3VtZW50TW9kZWwuZmlsZXMubGVuZ3RoID4gMSkge1xuICAgICAgdXBsb2FkRmlsZXMoJHNjb3BlLmFkZERvY3VtZW50TW9kZWwuZmlsZXMpO1xuICAgIH1cblxuICAgIGNvbnNvbGUubG9nKCdEb2N1bWVudCBhZGRlZCcpO1xuXG4gICAgY29uc29sZS5kaXIoJHNjb3BlLmFkZERvY3VtZW50TW9kZWwpO1xuICAgICRzY29wZS51cGRhdGVEb2N1bWVudFJlc2V0Rm9ybSgpO1xuICB9O1xuXG4gICRzY29wZS51cGRhdGVEb2N1bWVudENhbmNlbCA9IGZ1bmN0aW9uKCkge1xuICAgIGNvbnNvbGUubG9nKCdEb2N1bWVudCB1cGRhdGUgY2FuY2VsbGVkJyk7XG4gICAgJHNjb3BlLnVwZGF0ZURvY3VtZW50UmVzZXRGb3JtKCk7XG4gICAgYW5ndWxhci5lbGVtZW50KCcjdXBkYXRlLWRvY3VtZW50LW1vZGFsJykubW9kYWwoJ2hpZGUnKTtcbiAgfTtcblxuICAkc2NvcGUudXBkYXRlRG9jdW1lbnRTYXZlID0gZnVuY3Rpb24oKSB7XG4gICAgY29uc29sZS5sb2coJ0RvY3VtZW50IHVwZGF0ZWQgd2l0aCBjb21tZW50OiAnICsgJHNjb3BlLnVwZGF0ZURvY3VtZW50TW9kZWwuY29tbWVudCk7XG4gICAgYW5ndWxhci5lbGVtZW50KCcjdXBkYXRlLWRvY3VtZW50LW1vZGFsJykubW9kYWwoJ2hpZGUnKTtcbiAgICAkc2NvcGUudXBkYXRlRG9jdW1lbnRSZXNldEZvcm0oKTtcbiAgfTtcblxuICAkc2NvcGUuZWRpdERvY3VtZW50Q2FuY2VsID0gZnVuY3Rpb24oKSB7XG4gICAgY29uc29sZS5sb2coJ0RvY3VtZW50IGVkaXQgY2FuY2VsbGVkJyk7XG4gICAgJHNjb3BlLmVkaXREb2N1bWVudFJlc2V0Rm9ybSgpO1xuICB9O1xuXG4gICRzY29wZS5lZGl0RG9jdW1lbnRTYXZlID0gZnVuY3Rpb24oKSB7XG4gICAgY29uc29sZS5sb2coJ0RvY3VtZW50IGVkaXQgc2F2ZWQnKTtcbiAgICAkc2NvcGUuZWRpdERvY3VtZW50UmVzZXRGb3JtKCk7XG4gIH07XG5cbiAgJHNjb3BlLmNhdGVnb3JpZXMgPSBbXG4gICAge1xuICAgICAgc2x1ZzogJ3NmaS0xJyxcbiAgICAgIG5hbWU6ICcxIEdlbmVyYWwnLFxuICAgICAgcGFyZW50OiBudWxsLFxuICAgICAgZG9jdW1lbnRzOiBbXSxcbiAgICAgIGlzQ3VzdG9tOiBmYWxzZVxuICAgIH0sXG4gICAge1xuICAgICAgc2x1ZzogJ3NmaS0yJyxcbiAgICAgIG5hbWU6ICcyIEh1bGwgU3lzdGVtcycsXG4gICAgICBwYXJlbnQ6IG51bGwsXG4gICAgICBkb2N1bWVudHM6IFtdLFxuICAgICAgaXNDdXN0b206IGZhbHNlXG4gICAgfSxcbiAgICB7XG4gICAgICBzbHVnOiAnc2ZpLTMnLFxuICAgICAgbmFtZTogJzMgQ2FyZ28gRXF1aXBtZW50JyxcbiAgICAgIHBhcmVudDogbnVsbCxcbiAgICAgIGRvY3VtZW50czogW10sXG4gICAgICBuZXdDaGlsZHJlbkNvdW50OiAxLFxuICAgICAgaXNDdXN0b206IGZhbHNlXG4gICAgfSxcbiAgICB7XG4gICAgICBzbHVnOiAnc2ZpLTQnLFxuICAgICAgbmFtZTogJzQgU2hpcCBFcXVpcG1lbnQnLFxuICAgICAgcGFyZW50OiBudWxsLFxuICAgICAgZG9jdW1lbnRzOiBbXSxcbiAgICAgIG5ld0NoaWxkcmVuQ291bnQ6IDIsXG4gICAgICBpc0N1c3RvbTogZmFsc2VcbiAgICB9LFxuICAgIHtcbiAgICAgIHNsdWc6ICdzZmktNScsXG4gICAgICBuYW1lOiAnNSBDcmV3IGFuZCBQYXNzZW5nZXIgRXF1aXBtZW50JyxcbiAgICAgIHBhcmVudDogbnVsbCxcbiAgICAgIGRvY3VtZW50czogW10sXG4gICAgICBpc0N1c3RvbTogZmFsc2VcbiAgICB9LFxuICAgIHtcbiAgICAgIHNsdWc6ICdzZmktNicsXG4gICAgICBuYW1lOiAnNiBNYWNoaW5lcnkgTWFpbiBDb21wb25lbnRzJyxcbiAgICAgIHBhcmVudDogbnVsbCxcbiAgICAgIGRvY3VtZW50czogW10sXG4gICAgICBpc0N1c3RvbTogZmFsc2VcbiAgICB9LFxuICAgIHtcbiAgICAgIHNsdWc6ICdzZmktNycsXG4gICAgICBuYW1lOiAnNyBTeXN0ZW1zIGZvciBNYWNoaW5lcnkgTWFpbiBDb21wb25lbnRzJyxcbiAgICAgIHBhcmVudDogbnVsbCxcbiAgICAgIGRvY3VtZW50czogW10sXG4gICAgICBuZXdDaGlsZHJlbkNvdW50OiAzLFxuICAgICAgaXNDdXN0b206IGZhbHNlXG4gICAgfSxcbiAgICB7XG4gICAgICBzbHVnOiAnc2ZpLTgnLFxuICAgICAgbmFtZTogJzggQ29tbW9uIFN5c3RlbXMnLFxuICAgICAgcGFyZW50OiBudWxsLFxuICAgICAgZG9jdW1lbnRzOiBbXSxcbiAgICAgIGlzQ3VzdG9tOiBmYWxzZVxuICAgIH0sXG4gICAge1xuICAgICAgc2x1ZzogJ2N1c3RvbS1wdWJsaWMnLFxuICAgICAgbmFtZTogJ0N1c3RvbSBwdWJsaWMgZm9sZGVyJyxcbiAgICAgIGljb246ICdmYS1maWxlLXRleHQnLFxuICAgICAgcGFyZW50OiBudWxsLFxuICAgICAgZG9jdW1lbnRzOiBbXSxcbiAgICAgIGlzQ3VzdG9tOiB0cnVlLFxuICAgICAgaXNQcml2YXRlOiBmYWxzZVxuICAgIH0sXG4gICAge1xuICAgICAgc2x1ZzogJ2N1c3RvbS1wcml2YXRlJyxcbiAgICAgIG5hbWU6ICdDdXN0b20gcHJpdmF0ZSBmb2xkZXInLFxuICAgICAgaWNvbjogJ2ZhLWZpbGUtdGV4dCcsXG4gICAgICBwYXJlbnQ6IG51bGwsXG4gICAgICBkb2N1bWVudHM6IFtdLFxuICAgICAgaXNOZXc6IHRydWUsXG4gICAgICBuZXdDaGlsZHJlbkNvdW50OiAxLFxuICAgICAgaXNDdXN0b206IHRydWUsXG4gICAgICBpc1ByaXZhdGU6IHRydWVcbiAgICB9LFxuICBdO1xuXG4gICRzY29wZS5pc1NwaUZvbGRlciA9IGZ1bmN0aW9uKGZvbGRlcikge1xuICAgIHJldHVybiAoZm9sZGVyLnNsdWcuc3Vic3RyKDAsNCkgPT09ICdzZmktJykgJiYgZm9sZGVyLnBhcmVudCA9PT0gbnVsbDtcbiAgfTtcblxuICAkc2NvcGUuY2F0ZWdvcnlDb3VudCA9IDA7XG4gICRzY29wZS5hY3RpdmVDYXRlZ29yeSA9IG51bGw7XG4gICRzY29wZS5hY3RpdmVDYXRlZ29yaWVzPVtdO1xuICAkc2NvcGUuaW5jcmVtZW50Q2F0ZWdvcnlJbmRleCA9IGZ1bmN0aW9uKCkge1xuICAgICRzY29wZS5jYXRlZ29yeUNvdW50Kys7XG4gICAgcmV0dXJuICRzY29wZS5jYXRlZ29yeUNvdW50O1xuICB9O1xuXG4gICRzY29wZS5nZXRDYXRlZ29yeUluZGV4ID0gZnVuY3Rpb24oc2x1ZywgY2F0ZWdvcmllcykge1xuICAgIGxldCBhcnIgPSBjYXRlZ29yaWVzLm1hcChmdW5jdGlvbihjYXRlZ29yeSkge1xuICAgICAgcmV0dXJuIGNhdGVnb3J5LnNsdWc7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gYXJyLmluZGV4T2Yoc2x1Zyk7XG4gIH07XG5cbiAgJHNjb3BlLmdldFBhcmVudENhdGVnb3J5QnlTbHVnID0gZnVuY3Rpb24oc2x1ZywgY2F0ZWdvcmllcykge1xuICAgIHJldHVybiBjYXRlZ29yaWVzLmZpbmQoYyA9PiBjLnNsdWcgPT09IHNsdWcpO1xuICB9O1xuXG4gICRzY29wZS5vcGVuQ2F0ZWdvcnkgPSBmdW5jdGlvbihzbHVnID0gbnVsbCkge1xuICAgICRzY29wZS5hY3RpdmVDYXRlZ29yeSA9ICRzY29wZS5jYXRlZ29yaWVzLmZpbmQoYyA9PiBjLnNsdWcgPT09IHNsdWcpO1xuICB9O1xuXG4gICRzY29wZS5zZWxlY3RDYXRlZ29yeSA9IGZ1bmN0aW9uKHNsdWcgPSBudWxsKSB7XG4gICAgJHNjb3BlLnNlbGVjdGVkQ2F0ZWdvcnkgPSAkc2NvcGUuY2F0ZWdvcmllcy5maW5kKGMgPT4gYy5zbHVnID09PSBzbHVnKTtcbiAgfTtcblxuICAkc2NvcGUub3BlbkRvY3VtZW50ID0gZnVuY3Rpb24oaWQpIHtcbiAgICAkc2NvcGUuYWRkRG9jdW1lbnRSZXNldEZvcm0oKTtcbiAgICAkc2NvcGUudXBkYXRlRG9jdW1lbnRSZXNldEZvcm0oKTtcbiAgICAkc2NvcGUuZG9jdW1lbnRzLm1hcChmdW5jdGlvbihvYmope1xuICAgICAgb2JqLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgaWYgKG9iai5pZCA9PT0gaWQpIHtcbiAgICAgICAgb2JqLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICRzY29wZS5hY3RpdmVEb2N1bWVudCA9IG9iajtcbiAgICAgIH1cbiAgICB9KTtcbiAgfTtcblxuICAkc2NvcGUuY2xvc2VEb2N1bWVudCA9IGZ1bmN0aW9uKCkge1xuICAgICRzY29wZS5hY3RpdmVEb2N1bWVudCA9IG51bGw7XG4gICAgJHNjb3BlLmRvY3VtZW50cy5tYXAoZnVuY3Rpb24ob2JqKXtcbiAgICAgIG9iai5hY3RpdmUgPSBmYWxzZTtcbiAgICB9KTtcbiAgfTtcblxuICAkc2NvcGUuc2VsZWN0RG9jdW1lbnQgPSBmdW5jdGlvbiAoaWQpIHtcbiAgICAkc2NvcGUuc2VsZWN0ZWREb2N1bWVudCA9ICgkc2NvcGUuc2VsZWN0ZWREb2N1bWVudCAhPT0gaWQpID8gaWQgOiBudWxsO1xuICB9O1xuXG4gIGRvY3VtZW50RmFjdG9yeS50aGVuKGZ1bmN0aW9uKHJlcykge1xuICAgICRzY29wZS5kb2N1bWVudHMgPSByZXMuZGF0YTtcbiAgICAkc2NvcGUuY2F0ZWdvcmllcy5tYXAoZnVuY3Rpb24oY2F0KXtcbiAgICAgICRzY29wZS5kb2N1bWVudHMubWFwKGZ1bmN0aW9uKG9iail7XG4gICAgICAgIGlmIChvYmouY2F0ZWdvcnkgPT09IGNhdC5zbHVnKSB7XG4gICAgICAgICAgY2F0LmRvY3VtZW50cy5wdXNoKG9iaik7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuICB9KTtcblxuICBpc3N1ZUZhY3RvcnkudGhlbihmdW5jdGlvbihyZXMpIHtcbiAgICAkc2NvcGUubW9ja0RhdGEuaXNzdWVzID0gcmVzLmRhdGE7XG4gIH0pO1xuXG4gIGNoYW5nZVJlcXVlc3RGYWN0b3J5LnRoZW4oZnVuY3Rpb24ocmVzKSB7XG4gICAgJHNjb3BlLm1vY2tEYXRhLmNoYW5nZVJlcXVlc3RzID0gcmVzLmRhdGE7XG4gIH0pO1xuXG4gIG1pbGVzdG9uZXNGYWN0b3J5LnRoZW4oZnVuY3Rpb24ocmVzKSB7XG4gICAgJHNjb3BlLm1vY2tEYXRhLm1pbGVzdG9uZXMgPSByZXMuZGF0YTtcbiAgfSk7XG5cbiAgY2hlY2tsaXN0c0ZhY3RvcnkudGhlbihmdW5jdGlvbihyZXMpIHtcbiAgICAkc2NvcGUubW9ja0RhdGEuY2hlY2tsaXN0R3JvdXBzID0gcmVzLmRhdGE7XG5cbiAgICAkc2NvcGUubW9ja0RhdGEuYWxsQ2hlY2tsaXN0cyA9IHJlcy5kYXRhXG4gICAgICAubWFwKGdyb3VwID0+IGdyb3VwLmNoZWNrbGlzdHMpXG4gICAgICAucmVkdWNlKChhLGIpID0+IGEuY29uY2F0KGIpKVxuICAgICAgLm1hcChjaGVja2xpc3QgPT4ge1xuICAgICAgICBjaGVja2xpc3QuaXRlbXNDb21wbGV0ZWQgPSBjaGVja2xpc3QuaXRlbXMuZmlsdGVyKGl0ZW0gPT4gaXRlbS5zdGF0dXMgPT09ICdjb21wbGV0ZScpLmxlbmd0aDtcbiAgICAgICAgY2hlY2tsaXN0Lml0ZW1zVG90YWwgPSBjaGVja2xpc3QuaXRlbXMubGVuZ3RoO1xuICAgICAgICByZXR1cm4gY2hlY2tsaXN0O1xuICAgICAgfSk7XG4gICAgJHNjb3BlLm1vY2tEYXRhLmFsbENoZWNrbGlzdHMuaXRlbXNUb3RhbCA9ICRzY29wZS5tb2NrRGF0YS5hbGxDaGVja2xpc3RzXG4gICAgICAucmVkdWNlKChhLCBiKSA9PiBhICsgYi5pdGVtc1RvdGFsLCAwKTtcbiAgICAkc2NvcGUubW9ja0RhdGEuYWxsQ2hlY2tsaXN0cy5pdGVtc0NvbXBsZXRlZCA9ICRzY29wZS5tb2NrRGF0YS5hbGxDaGVja2xpc3RzXG4gICAgICAucmVkdWNlKChhLCBiKSA9PiBhICsgYi5pdGVtc0NvbXBsZXRlZCwgMCk7XG4gICAgJHNjb3BlLm1vY2tEYXRhLmFsbENoZWNrbGlzdHNDb21wbGV0ZWQgPSAkc2NvcGUubW9ja0RhdGEuYWxsQ2hlY2tsaXN0c1xuICAgICAgLnJlZHVjZSgoYSwgYikgPT4gKGIuaXRlbXNUb3RhbCA+IGIuaXRlbXNDb21wbGV0ZWQpID8gYSA6IGEgKyAxLCAwKTtcblxuICAgICRzY29wZS5tb2NrRGF0YS5jaGVja2xpc3RzSW5Hcm91cCA9ICRzY29wZS5tb2NrRGF0YS5jaGVja2xpc3RHcm91cHNbMF0uY2hlY2tsaXN0c1xuICAgICAgLm1hcChjaGVja2xpc3QgPT4ge1xuICAgICAgICBsZXQgY2xlYW5Hcm91cCA9IGFuZ3VsYXIuY29weSgkc2NvcGUubW9ja0RhdGEuY2hlY2tsaXN0R3JvdXBzWzBdKTtcblxuICAgICAgICBkZWxldGUgY2xlYW5Hcm91cC5jaGVja2xpc3RzO1xuICAgICAgICBjaGVja2xpc3QuZ3JvdXAgPSBjbGVhbkdyb3VwO1xuICAgICAgICBjaGVja2xpc3QuaXRlbXMgPSBjaGVja2xpc3QuaXRlbXNcbiAgICAgICAgICAuZmlsdGVyKGl0ZW0gPT4gaXRlbS5zdGF0dXMgIT09ICdpZ25vcmVkJylcbiAgICAgICAgICAubWFwKGl0ZW0gPT4ge1xuICAgICAgICAgICAgaXRlbS5vcGVuSXNzdWVzQ291bnQgPSBpdGVtLmlzc3Vlcy5maWx0ZXIoaSA9PiBpLnN0YXR1cyA9PT0gJ29wZW4nKS5sZW5ndGg7XG4gICAgICAgICAgICByZXR1cm4gaXRlbTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGNoZWNrbGlzdDtcbiAgICAgIH1cbiAgICApO1xuICB9KTtcblxuICBjaGVja2luc0ZhY3RvcnkudGhlbihmdW5jdGlvbihyZXMpIHtcblxuICAgIGNvbnN0IHVwZGF0ZURhdGVzID0gZnVuY3Rpb24gKGNoZWNrSW4pIHtcbiAgICAgIGlmIChhbmd1bGFyLmlzRGVmaW5lZChjaGVja0luLmRhdGVGcm9tKSkge1xuICAgICAgICBjb25zdCBkYXkgPSBuZXcgRGF0ZShuZXcgRGF0ZShjaGVja0luLmRhdGVGcm9tKS5zZXRIb3VycygwLDAsMCwwKSk7XG4gICAgICAgIGNvbnN0IGRhdGVUb0lzbyA9IG5ldyBEYXRlKGNoZWNrSW4uZGF0ZVRvLnNsaWNlKDAsIC00KSk7XG5cbiAgICAgICAgY2hlY2tJbi5kYXkgPSBkYXkudG9JU09TdHJpbmcoKTtcbiAgICAgICAgY2hlY2tJbi5kYXRlVG8gPSBkYXRlVG9Jc28udG9JU09TdHJpbmcoKTtcblxuICAgICAgfVxuICAgICAgcmV0dXJuIGNoZWNrSW47XG4gICAgfTtcblxuICAgICRzY29wZS5tb2NrRGF0YS5jaGVja2lucyA9IHJlcy5kYXRhLm1hcChjID0+IHVwZGF0ZURhdGVzKGMpKTtcbiAgfSk7XG5cbiAgdXNlcnNGYWN0b3J5LnRoZW4oZnVuY3Rpb24ocmVzKSB7XG4gICAgJHNjb3BlLm1vY2tEYXRhLnVzZXJzID0gcmVzLmRhdGE7XG4gIH0pO1xuXG4gICRzY29wZS5zZWFyY2hDaGVja2xpc3RJdGVtcyA9IGZ1bmN0aW9uKHF1ZXJ5KSB7XG5cbiAgICBxdWVyeSA9IChhbmd1bGFyLmlzRGVmaW5lZChxdWVyeSkpID8gcXVlcnkudG9Mb3dlckNhc2UoKSA6IHF1ZXJ5O1xuXG4gICAgcmV0dXJuIGl0ZW0gPT4ge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgIXF1ZXJ5IHx8XG4gICAgICAgIChpdGVtLm5hbWUudG9Mb3dlckNhc2UoKS5pbmRleE9mKHF1ZXJ5KSAhPT0gLTEpXG4gICAgICApO1xuICAgIH07XG4gIH07XG5cbiAgJHNjb3BlLmNoZWNrbGlzdEl0ZW1zRmlsdGVyZWRDb3VudCA9IGZ1bmN0aW9uKGl0ZW1zPVtdKSB7XG4gICAgbGV0IGZsYXR0ZW5lZCA9IChpdGVtcy5sZW5ndGggPiAwKSA/IGl0ZW1zLnJlZHVjZSgoYSwgYikgPT4gYS5jb25jYXQoYikpIDogaXRlbXM7XG5cbiAgICByZXR1cm4gZmxhdHRlbmVkLmxlbmd0aDtcbiAgfTtcblxuICAkc2NvcGUub3BlbkZpbHRlcklzc3Vlc01vZGFsID0gZnVuY3Rpb24oKSB7XG4gICAgYW5ndWxhci5lbGVtZW50KCcjZmlsdGVyLWlzc3Vlcy1tb2RhbCcpLm1vZGFsKCdzaG93Jyk7XG4gIH07XG5cbiAgJHNjb3BlLmFkZElzc3VlID0gZnVuY3Rpb24oZmlsZXMpIHtcbiAgICBmaWxlcyA9IGZpbGVzIHx8IFtdO1xuICAgICRzY29wZS5hY3RpdmVJc3N1ZSA9IG51bGw7XG4gICAgZGVsZXRlICRzY29wZS5hZGRDaGFuZ2VSZXF1ZXN0TW9kZWw7XG4gICAgZGVsZXRlICRzY29wZS5hZGRDaGFuZ2VSZXF1ZXN0TW9kZWxUZW1wO1xuICAgICRzY29wZS5hZGRJc3N1ZU1vZGVsID0ge1xuICAgICAgZmlsZTogZmlsZXNbMF0gfHwgbnVsbFxuICAgIH07XG4gICAgJHRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgIGFuZ3VsYXIuZWxlbWVudCgnI2FkZC1pc3N1ZS1mb3JtLXRpdGxlJykuZm9jdXMoKTtcbiAgICB9KTtcbiAgfTtcblxuICAkc2NvcGUuYWRkSXNzdWVGaWxlID0gZnVuY3Rpb24oZmlsZXMpIHtcbiAgICBmaWxlcyA9IGZpbGVzIHx8IFtdO1xuICAgICRzY29wZS5hZGRJc3N1ZU1vZGVsLmZpbGUgPSBmaWxlc1swXSB8fCBudWxsO1xuICAgIGNvbnNvbGUubG9nKCdJbWFnZSBzZXQnKTtcbiAgICBjb25zb2xlLmRpcigkc2NvcGUuYWRkSXNzdWVNb2RlbC5maWxlKTtcbiAgfTtcblxuICAkc2NvcGUucmVzZXRBZGRJc3N1ZUZvcm0gPSBmdW5jdGlvbigpIHtcbiAgICBkZWxldGUgJHNjb3BlLmFkZElzc3VlTW9kZWw7XG4gICAgJHNjb3BlLmFkZElzc3VlRm9ybS4kc2V0UHJpc3RpbmUoKTtcbiAgfTtcblxuICAkc2NvcGUuYWRkSXNzdWVDYW5jZWwgPSBmdW5jdGlvbigpIHtcbiAgICBjb25zb2xlLmxvZygnSXNzdWUgbm90IGFkZGVkJyk7XG4gICAgJHNjb3BlLmFkZElzc3VlTW9kZWwgPSBudWxsO1xuICAgICRzY29wZS5yZXNldEFkZElzc3VlRm9ybSgpO1xuICB9O1xuXG4gICRzY29wZS5hZGRJc3N1ZVNhdmUgPSBmdW5jdGlvbigpIHtcbiAgICBjb25zb2xlLmxvZygnSXNzdWUgYWRkZWQnKTtcbiAgICBjb25zb2xlLmRpcigkc2NvcGUuYWRkSXNzdWVNb2RlbCk7XG4gICAgJHNjb3BlLnJlc2V0QWRkSXNzdWVGb3JtKCk7XG4gIH07XG5cbiAgJHNjb3BlLm9wZW5Jc3N1ZSA9IGZ1bmN0aW9uKGlkKSB7XG4gICAgaWYgKGFuZ3VsYXIuaXNEZWZpbmVkKCRzY29wZS5hY3RpdmVJc3N1ZSkpIHtcbiAgICAgICRzY29wZS5jbG9zZUlzc3VlKCk7XG4gICAgfVxuICAgICRzY29wZS5yZXNldEFkZElzc3VlRm9ybSgpO1xuICAgICRzY29wZS5tb2NrRGF0YS5pc3N1ZXMubWFwKGZ1bmN0aW9uKG9iail7XG4gICAgICBvYmouYWN0aXZlID0gZmFsc2U7XG4gICAgICBpZiAob2JqLmlkID09PSBpZCkge1xuICAgICAgICBvYmouYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgJHNjb3BlLmFjdGl2ZUlzc3VlID0gb2JqO1xuICAgICAgfVxuICAgIH0pO1xuICAgICR0aW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAkc2NvcGUuc2Nyb2xsVG9Cb3R0b20oKTtcbiAgICB9KTtcbiAgICBjb25zb2xlLmxvZygnSXNzdWUgb3BlbmVkJyk7XG4gIH07XG5cbiAgJHNjb3BlLmNsb3NlSXNzdWUgPSBmdW5jdGlvbigpIHtcbiAgICBkZWxldGUgJHNjb3BlLmFjdGl2ZUlzc3VlO1xuICAgICRzY29wZS5tb2NrRGF0YS5pc3N1ZXMubWFwKGZ1bmN0aW9uKG9iail7XG4gICAgICBvYmouYWN0aXZlID0gZmFsc2U7XG4gICAgfSk7XG4gICAgY29uc29sZS5sb2coJ0lzc3VlIGNsb3NlZCcpO1xuICB9O1xuXG4gICRzY29wZS5hZGRDaGFuZ2VSZXF1ZXN0ID0gZnVuY3Rpb24obW9kZWwpIHtcbiAgICAkc2NvcGUuYWRkQ2hhbmdlUmVxdWVzdE1vZGVsID0gbW9kZWw7XG4gIH07XG5cbiAgJHNjb3BlLnJlbW92ZUNoYW5nZVJlcXVlc3QgPSBmdW5jdGlvbigpIHtcbiAgICBkZWxldGUgJHNjb3BlLmFkZENoYW5nZVJlcXVlc3RNb2RlbDtcbiAgICBkZWxldGUgJHNjb3BlLmFkZENoYW5nZVJlcXVlc3RNb2RlbFRlbXA7XG4gIH07XG5cbiAgJHNjb3BlLnNjcm9sbFRvQm90dG9tID0gZnVuY3Rpb24oKSB7XG4gICAgbGV0IGVsZW0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWN0aXZlLWlzc3VlLWVudHJpZXMnKTtcblxuICAgIGVsZW0uc2Nyb2xsVG9wID0gZWxlbS5zY3JvbGxIZWlnaHQ7XG4gIH07XG5cblxuICAvLyBHZW5lcmF0ZSByYW5kb20gbnVtYmVyIGZvciBlYWNoIG5nUmVwZWF0IHdpdGhvdXQgY2F1c2luZyBkaWdlc3Qgb3ZlcmZsb3dcbiAgbGV0IHJhbmQgPSAxO1xuXG4gICRzY29wZS5nZW5lcmF0ZUF2YXRhclBsYWNlaG9sZGVySW5kZXggPSBmdW5jdGlvbigpIHtcbiAgICByYW5kID0gTWF0aC5mbG9vcigoTWF0aC5yYW5kb20oKSo1KSk7XG4gIH07XG5cbiAgJHNjb3BlLmdldEF2YXRhclBsYWNlaG9sZGVySW5kZXggPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gcmFuZDtcbiAgfTtcblxuLy8gICBBZGQgQ2hlY2tpbiBmb3JtXG4gIGNvbnN0IHRvZGF5ID0gbmV3IERhdGUoKTtcblxuICAkc2NvcGUuY2hlY2tpbkxpc3RNb250aCA9IG5ldyBEYXRlKHRvZGF5LmdldEZ1bGxZZWFyKCksIHRvZGF5LmdldE1vbnRoKCksIDEsIDAsIDAsIDApO1xuICAkc2NvcGUuYWRkQ2hlY2tpbk1vZGVsID0ge1xuICAgIGRhdGVGcm9tOiBuZXcgRGF0ZSh0b2RheS5nZXRGdWxsWWVhcigpLCB0b2RheS5nZXRNb250aCgpLCB0b2RheS5nZXREYXRlKCksIDcsIDAsIDApLFxuICAgIGRhdGVUbzogbmV3IERhdGUodG9kYXkuZ2V0RnVsbFllYXIoKSwgdG9kYXkuZ2V0TW9udGgoKSwgdG9kYXkuZ2V0RGF0ZSgpLCAxNSwgMCwgMClcbiAgfTtcblxufSk7XG4iXX0=
