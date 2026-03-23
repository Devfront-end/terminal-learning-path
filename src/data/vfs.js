export const vfs = {
  '/': ['home/', 'var/', 'etc/', 'usr/'],
  '/home': ['user/'],
  '/home/user': ['projects/', 'Documents/', '.bashrc', '.bash_profile'],
  '/home/user/projects': ['my_app/', 'README.md'],
  '/home/user/projects/my_app': [
    'app/', 'config/', 'logs/', 'tests/', 'vendor/', 'webroot/',
    '.gitignore', 'composer.json', 'composer.lock',
  ],
  '/home/user/projects/my_app/app': ['Controller/', 'Model/', 'View/'],
  '/home/user/projects/my_app/app/Model': [
    'AppModel.php', 'User.php', 'Item.php', 'Category.php',
  ],
  '/home/user/projects/my_app/app/Controller': [
    'AppController.php', 'UsersController.php', 'ItemsController.php',
  ],
  '/home/user/projects/my_app/app/View': ['Users/', 'Items/', 'Layouts/'],
  '/home/user/projects/my_app/webroot': ['index.php', 'css/', 'js/'],
  '/home/user/projects/my_app/config': ['database.php', 'core.php', 'routes.php'],
  '/home/user/projects/my_app/logs': ['error.log', 'debug.log', 'access.log'],
  '/home/user/projects/my_app/vendor': ['composer/'],
  '/home/user/projects/my_app/vendor/composer': [
    'ClassLoader.php', 'autoload_psr4.php', 'installed.json',
  ],
  '/var/log': ['auth.log', 'syslog', 'error.log'],
};

export const allFiles = [
  '/home/user/projects/my_app/.gitignore',
  '/home/user/projects/my_app/composer.json',
  '/home/user/projects/my_app/app/Controller/AppController.php',
  '/home/user/projects/my_app/app/Controller/UsersController.php',
  '/home/user/projects/my_app/app/Controller/ItemsController.php',
  '/home/user/projects/my_app/app/Model/AppModel.php',
  '/home/user/projects/my_app/app/Model/User.php',
  '/home/user/projects/my_app/app/Model/Item.php',
  '/home/user/projects/my_app/app/Model/Category.php',
  '/home/user/projects/my_app/webroot/index.php',
  '/home/user/projects/my_app/config/database.php',
  '/home/user/projects/my_app/config/core.php',
  '/home/user/projects/my_app/config/routes.php',
  '/home/user/projects/my_app/logs/error.log',
  '/home/user/projects/my_app/logs/debug.log',
  '/home/user/projects/my_app/logs/access.log',
  '/home/user/projects/my_app/vendor/composer/ClassLoader.php',
  '/var/log/error.log',
];

export const allDirs = [
  '/home/user/projects/my_app',
  '/home/user/projects/my_app/app',
  '/home/user/projects/my_app/app/Controller',
  '/home/user/projects/my_app/app/Model',
  '/home/user/projects/my_app/app/View',
  '/home/user/projects/my_app/config',
  '/home/user/projects/my_app/logs',
  '/home/user/projects/my_app/vendor',
  '/home/user/projects/my_app/vendor/composer',
  '/home/user/projects/my_app/webroot',
  '/home/user/projects/my_app/tests',
];
