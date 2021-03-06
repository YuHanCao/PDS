DROP DATABASE controle_arborizacao;
CREATE DATABASE controle_arborizacao;
USE controle_arborizacao;
CREATE TABLE arvore(id INT NOT NULL key auto_increment, dataPlantio date NOT NULL, ultimaPoda date, localizacaoNome varchar(500) NOT NULL, latitude float NOT NULL, longitude float NOT NULL, podaSolicitada boolean NOT NULL);
CREATE TABLE usuario(nome varchar(500) NOT NULL, email varchar(500) NOT NULL key, cargo varchar(50) NOT NULL CHECK (cargo = 'funcionario' OR cargo = 'surpevisor' OR cargo = 'usuario'));

INSERT INTO arvore (dataPlantio, ultimaPoda, localizacaoNome, latitude, longitude, podaSolicitada) VALUES('2021-10-08','2022-01-01','Faria Lima, 3900',-23.590065,-46.681747,false);
INSERT INTO arvore (dataPlantio, ultimaPoda, localizacaoNome, latitude, longitude, podaSolicitada) VALUES('2016-12-12','2019-12-12','João Cachoeira, 1486', -23.593388, -46.675031,true);
INSERT INTO arvore (dataPlantio, localizacaoNome, latitude, longitude, podaSolicitada) VALUES( '2020-10-12', 'Faria Lima, 3477', -23.586755, -46.682315, true);
INSERT INTO arvore (dataPlantio, localizacaoNome, latitude, longitude, podaSolicitada) VALUES( '2022-10-02', 'Clodomiro Amazonas, 185-91',-23.585538, -46.679758,false);
INSERT INTO arvore (dataPlantio, ultimaPoda, localizacaoNome, latitude, longitude, podaSolicitada) VALUES( '2000-10-12','2018-12-13','Itaim Bibi',-23.587396, -46.685562,true);

INSERT INTO usuario VALUES('Miguel Braz','miguelprates@estudante.ufscar.br','funcionario');
INSERT INTO usuario VALUES('Lucas Ribeiro','lucasribeiro@estudante.ufscar.br','funcionario');
INSERT INTO usuario VALUES('Yu Han Cao','yuhancao@estudante.ufscar.br','funcionario');
INSERT INTO usuario VALUES('Miguel Braz','miguel.prates@dcomp.sor.ufscar.br','usuario');
INSERT INTO usuario VALUES('Lucas Ribeiro','maxlucasmax@gmail.com','usuario');
INSERT INTO usuario VALUES('Yu Han Cao','yu.cao@dcomp.sor.ufscar.br','usuario');