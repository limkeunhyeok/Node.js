exports.getEmailInfo = 'SELECT * FROM members WHERE email = (?)';
exports.getMembersList = 'SELECT * FROM members';
exports.register = 'INSERT INTO members (email, password, nick) values (?, ?, ?)';
exports.unregister = 'DELETE FROM members WHERE email = (?)';