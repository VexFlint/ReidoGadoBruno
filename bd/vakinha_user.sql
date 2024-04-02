# Criar usuário e definir permissões
CREATE USER 'Vakinha'@'localhost' IDENTIFIED BY 'to333342sh12696tp152otp1048576dd760c';

# Garantindo os privilégios do usuário criado
GRANT ALL PRIVILEGES ON *.* TO 'Vakinha'@'localhost';

# Verificação se usuário foi criado
SELECT * FROM mysql.user;

# Excluir usuário criado
DROP USER 'Vakinha'@'localhost';