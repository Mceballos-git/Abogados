Development Environment Setup.
--
Clone Repository:
```
cd /var/www/html/
git clone {url} 
```

Install Composer: 
https://getcomposer.org/download/

Install Dependencies:
```
cd /var/www/html/abogados/backend
sudo chmod -R 0777 ./storage
php composer.phar install
```

#Virtual Host Setup:

Create new VirtualHost

```
cd /etc/apache2/sites-available/
sudo touch local.abogados.com.conf
```
Insert the following content into `local.abogados.com.conf` file

```
<VirtualHost *:80>
    ServerAdmin webmaster@localhost
    ServerName abogados.com
    ServerAlias local.abogados.com
    DocumentRoot /var/www/html/abogados/backend/public
    <Directory "/var/www/html/abofados/backend/public">
      Options Indexes FollowSymLinks
      AllowOverride All   
      Order allow,deny
      Allow from all
    </Directory>
    DirectoryIndex index.php
    ErrorLog ${APACHE_LOG_DIR}/error.log
    CustomLog ${APAC
    HE_LOG_DIR}/access.log combined
</VirtualHost>
```

Publish the site:

```sudo a2ensite local.abogados.com.conf```

Create new host:
```
sudo gedit /etc/hosts

... add the following Line to Hosts file:

127.0.0.1      local.abogados.com

```

Restart Apache

``` sudo service apache2 restart ```


Other usefull commands:
```
sudo apt-get install php7.1-xml
```


Prepare SQL:
Create user,
Create database
Grant Permision to user into database.

`CREATE database abogados;`
