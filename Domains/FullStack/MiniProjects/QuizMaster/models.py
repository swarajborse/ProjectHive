from app import app
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from sqlalchemy.dialects.postgresql import JSONB

db = SQLAlchemy(app)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(92), unique=True)
    passhash = db.Column(db.String(256), nullable=False)
    name = db.Column(db.String(64), nullable=True)
    dob = db.Column(db.DateTime, nullable=True)
    qualification = db.Column(db.String(256), nullable=True)
    is_admin = db.Column(db.Boolean, nullable=False, default=False)

class Subject(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    subject_name = db.Column(db.String(92), unique=True, nullable=False)
    subject_description = db.Column(db.String(256), nullable=True)

class Chapter(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    chapter_name = db.Column(db.String(92), unique=True, nullable=False)
    chapter_description = db.Column(db.String(256), nullable=True)
    subject_id = db.Column(db.Integer, db.ForeignKey('subject.id'), nullable=False)
    subject = db.relationship('Subject', backref=db.backref('chapters', lazy=True, cascade='all, delete'))

    quizzes = db.relationship('Quiz', back_populates='chapter', lazy=True, cascade='all, delete-orphan')

    def get_questions_count(self):
        return sum(len(quiz.questions) for quiz in self.quizzes)

class Quiz(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    quiz_name = db.Column(db.String(92), unique=True, nullable=False)
    remarks = db.Column(db.String(256), nullable=True)
    chapter_id = db.Column(db.Integer, db.ForeignKey('chapter.id'), nullable=False)
    chapter = db.relationship('Chapter', back_populates='quizzes')
    date_of_quiz = db.Column(db.DateTime, nullable=False)
    time_duration = db.Column(db.Interval, nullable=False)
    questions = db.relationship('Question', back_populates='quiz', lazy=True, cascade='all, delete-orphan')
    scores = db.relationship('Scores', back_populates='quiz', lazy=True, cascade='all, delete-orphan')

class Question(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    question_number = db.Column(db.Integer, nullable=False)
    question_title = db.Column(db.String(256), nullable=False)
    question_statement = db.Column(db.Text, nullable=False)
    option1 = db.Column(db.String(256), nullable=False)
    option2 = db.Column(db.String(256), nullable=False)
    option3 = db.Column(db.String(256), nullable=False)
    option4 = db.Column(db.String(256), nullable=False)
    correct_option = db.Column(db.String(1), nullable=False)
    quiz_id = db.Column(db.Integer, db.ForeignKey('quiz.id'), nullable=False)
    quiz = db.relationship('Quiz', back_populates='questions')

    @staticmethod
    def get_next_question_number(quiz_id):
        last_question = Question.query.filter_by(quiz_id=quiz_id).order_by(Question.question_number.desc()).first()
        if last_question:
            return last_question.question_number + 1
        return 1

class Scores(db.Model):
    __tablename__ = 'scores'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    user = db.relationship('User', backref=db.backref('scores', lazy=True))
    quiz_id = db.Column(db.Integer, db.ForeignKey('quiz.id'), nullable=False)
    quiz = db.relationship('Quiz', back_populates='scores')
    
    total_scored = db.Column(db.Integer, nullable=False)
    time_stamp_of_event = db.Column(db.DateTime, nullable=False)
    user_answers = db.Column(JSONB, nullable=False)


with app.app_context():
    db.create_all()
    admin = User.query.filter_by(is_admin=True).first()
    if not admin:
        password_hash = generate_password_hash('admin')
        admin = User(username='admin', passhash=password_hash, name='admin', is_admin=True)
        db.session.add(admin)
        db.session.commit()