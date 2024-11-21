const Sequelize = require('sequelize')

// 모델은 크게 static initiate 메서드와 static associate 메서드로 나누어 짐
// static initiate => 테이블에 대한 설정
// static associate => 다른 모델과의 관계를 적음
class User extends Sequelize.Model {
  static initiate(sequelize) {
    // 첫번째 인수: 테이블 컬럼 설정
    // 두번째 인수: 테이블 자체에 대한 설정
    // 시퀄라이즈가 알아서 id를 기본 키로 연결해서 id 컬럼은 적을 필요 없음
    User.init({
      name: {
        type: Sequelize.STRING(20),
        allowNull: false,
        unique: true,
      },
      age: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
      },
      married: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      comment: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      }
    }, {
      sequelize, // static initiate 메서드의 매개변수와 연결되는 옵션
      timestamps: false, // true라면 createdAt과 updatedAt 컬럼을 추가함
      underscored: false, // 시퀄라이즈는 기본적으로 테이블명과 컬럼명을 createdAt처럼 camelcase를 사용
      modelName: 'User', // 모델 이름 설정
      tableName: 'users', // 실제 데이터베이스의 테이블 이름
      paranoid: false, // true면 deletedAt 컬림이 생김 (복구용)
      charset: 'utf8', // charset, collate => 한글 및 이모티콘 입력 가능
      collate: 'utf8_general_ci'
    })
  }

  static associate(db) {
    db.User.hasMany(db.Comment, {
      foreignKey: 'commenter',
      sourceKey: 'id'
    })
  }
}

module.exports = User