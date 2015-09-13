# Tutorial React.js/Node.js/PostgreSQL on Heroku

[![Deploy](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)

### after deploy ...
#### table create & insert data(you need to install 'heroku toolbelt', 'postgreSQL' like below 'install wget ~')

    $ heroku pg:psql --app {deployed app name , like 'whispering-badlands-2199'}} DATABASE
    
    CREATE SEQUENCE users_seq;
    
    CREATE TABLE IF NOT EXISTS users (
      "id" integer PRIMARY KEY default nextval('users_seq'),
      "name" varchar(30) DEFAULT NULL,
      "email" varchar(128) DEFAULT NULL
    );
    
    INSERT INTO users (name, email) VALUES
    ('hogetahogeo', 'hoge@hoge.com');

### set up for testing from localPC (use vagrant)
#### vagrant set up

    $ vagrant box add tutorial https://github.com/2creatives/vagrant-centos/releases/download/v6.5.3/centos65-x86_64-20140116.box
    $ mkdir tutorial
    $ cd tutorial
    $ vagrant init tutorial
    ** edit Vagrantfile (add setting "config.vm.synced_folder") about host from localpc, sync source folder
     -> config.vm.network "private_network", ip: "192.168.33.10"
     -> config.vm.synced_folder "src", "/home/vagrant/src", create: true, owner: "vagrant", group: "vagrant"
    $ mkdir src
    $ vagrant up
    $ vagrant ssh

#### install wget,ruby,postgreSQL,herokutoolbelt,npm into virtual environment 

    $ vagrant ssh
    ** install ruby
    $ sudo yum install wget
    $ sudo yum -y install gcc zlib-devel openssl-devel sqlite sqlite-devel mysql-devel readline-devel libffi-devel
    $ cd /usr/local/src
    $ sudo wget https://cache.ruby-lang.org/pub/ruby/2.2/ruby-2.2.3.tar.gz
    $ sudo tar zxvf ruby-2.2.3.tar.gz
    $ cd ruby-2.2.3
    $ sudo ./configure
    $ sudo make
    $ sudo make install
    ** install postgreSQL
    $ sudo vi /etc/yum.repos.d/CentOS-Base.repo
      ** add below at [base] and [updates]
      -> exclude=postgresql*
    $ sudo yum localinstall http://yum.postgresql.org/9.4/redhat/rhel-6-x86_64/pgdg-centos94-9.4-1.noarch.rpm
    $ sudo yum install postgresql94-server postgresql94-contrib
    ** install herokutoolbelt
    $ sudo wget -qO- https://toolbelt.heroku.com/install.sh | sh
    ** export PATH="/usr/local/heroku/bin:$PATH"
    $ cd ~
    $ vi .bash_profile
    ** add below
     PATH="/usr/local/heroku/bin:$PATH"
     export PATH
    
    $ exit
    ** set up env
    $ vagrant ssh
    $ heroku keys:add
    
    $ sudo passwd postgres
      {input new password}
    $ sudo service postgresql-9.4 initdb
    $ sudo service postgresql-9.4 start
    $ sudo chkconfig postgresql-9.4 on
    
    ** postgres config file
    $ sudo vi /var/lib/pgsql/9.4/data/pg_hba.conf
    *** change Local : local  all  all  peer -> local  all  all  trust
    *** change IPv4 METHOD : ident -> trust
    $ su - postgres
    $ pg_ctl reload -D /var/lib/pgsql/9.4/data
    $ pg_ctl status
    (check 'PID' !)
    $ pg_ctl kill TERM {PID}
    $ pg_ctl start

    ** install npm, gulp, necessary librally
    $ cd /~
    $ sudo yum install npm
    $ sudo npm install -g gulp
    $ npm install

### as a reference
https://github.com/SalesforceDevelopersJapan/nibs-jp  
http://expressjs.com/guide/routing.html  
http://qiita.com/morou/items/06cbe49f64d56d31b793  
http://www.yoheim.net/blog.php?q=20150101  
http://qiita.com/Awa_Dama/items/3f73ec4f5bf94bac2094  
http://www.bucyou.net/blog/1219  
https://github.com/reactjs/react-tutorial  
http://mae.chab.in/archives/2529  
http://code.runnable.com/VOIYIALkqgAnHDmj/node-js-socket-io-and-react-js  
http://qiita.com/masato/items/35b0900e3a7282b33bf8  
http://qiita.com/hashrock/items/3113690bb3de5bba639b  
