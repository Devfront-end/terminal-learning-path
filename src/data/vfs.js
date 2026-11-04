export const vfs = {
  '/': ['home/', 'var/', 'etc/', 'usr/'],
  '/home': ['john_doe/'],
  '/home/john_doe': ['projets/', 'Documents/', '.bashrc', '.bash_profile'],
  '/home/john_doe/projets': ['my_project/', 'README.md'],
  '/home/john_doe/projets/my_project': [
    'app/', 'config/', 'logs/', 'tests/', 'vendor/', 'webroot/',
    '.gitignore', 'composer.json', 'composer.lock',
  ],
  '/home/john_doe/projets/my_project/app': ['Controller/', 'Model/', 'View/'],
  '/home/john_doe/projets/my_project/app/Model': [
    'AppModel.php', 'User.php', 'Item.php', 'Category.php', 'Budget.php', 'Transaction.php',
  ],
  '/home/john_doe/projets/my_project/app/Controller': [
    'AppController.php', 'UsersController.php', 'ItemsController.php',
  ],
  '/home/john_doe/projets/my_project/app/View': ['Users/', 'Items/', 'Layouts/'],
  '/home/john_doe/projets/my_project/webroot': ['index.php', 'css/', 'js/'],
  '/home/john_doe/projets/my_project/config': ['database.php', 'core.php', 'routes.php'],
  '/home/john_doe/projets/my_project/logs': ['error.log', 'debug.log', 'access.log'],
  '/home/john_doe/projets/my_project/vendor': ['composer/'],
  '/home/john_doe/projets/my_project/vendor/composer': [
    'ClassLoader.php', 'autoload_psr4.php', 'installed.json',
  ],
  '/var/log': ['auth.log', 'syslog', 'error.log'],
};

export const allFiles = [
  '/home/john_doe/projets/my_project/.gitignore',
  '/home/john_doe/projets/my_project/composer.json',
  '/home/john_doe/projets/my_project/app/Controller/AppController.php',
  '/home/john_doe/projets/my_project/app/Controller/UsersController.php',
  '/home/john_doe/projets/my_project/app/Controller/ItemsController.php',
  '/home/john_doe/projets/my_project/app/Model/AppModel.php',
  '/home/john_doe/projets/my_project/app/Model/User.php',
  '/home/john_doe/projets/my_project/app/Model/Item.php',
  '/home/john_doe/projets/my_project/app/Model/Category.php',
  '/home/john_doe/projets/my_project/app/Model/Budget.php',
  '/home/john_doe/projets/my_project/app/Model/Transaction.php',
  '/home/john_doe/projets/my_project/webroot/index.php',
  '/home/john_doe/projets/my_project/config/database.php',
  '/home/john_doe/projets/my_project/config/core.php',
  '/home/john_doe/projets/my_project/config/routes.php',
  '/home/john_doe/projets/my_project/logs/error.log',
  '/home/john_doe/projets/my_project/logs/debug.log',
  '/home/john_doe/projets/my_project/logs/access.log',
  '/home/john_doe/projets/my_project/vendor/composer/ClassLoader.php',
  '/var/log/error.log',
];

export const allDirs = [
  '/home/john_doe/projets/my_project',
  '/home/john_doe/projets/my_project/app',
  '/home/john_doe/projets/my_project/app/Controller',
  '/home/john_doe/projets/my_project/app/Model',
  '/home/john_doe/projets/my_project/app/View',
  '/home/john_doe/projets/my_project/config',
  '/home/john_doe/projets/my_project/logs',
  '/home/john_doe/projets/my_project/vendor',
  '/home/john_doe/projets/my_project/vendor/composer',
  '/home/john_doe/projets/my_project/webroot',
  '/home/john_doe/projets/my_project/tests',
];
