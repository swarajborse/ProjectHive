from flask import render_template, request, flash, redirect, url_for, session, jsonify
from app import app
from models import db, User, Subject, Chapter, Quiz, Question, Scores
from werkzeug.security import generate_password_hash, check_password_hash
from functools import wraps
from datetime import datetime, timedelta
from sqlalchemy import Date, cast, func
import pytz
from datetime import datetime
ist = pytz.timezone("Asia/Kolkata")
ist_time = datetime.now(pytz.utc).astimezone(ist)

def auth_required(func):
    @wraps(func)
    def inner(*args, **kwargs):
        if 'user_id' not in session:
            flash("Please login to continue")
            return redirect(url_for('login'))
        if session.get('is_admin'):  
            return redirect(url_for('admin'))
        return func(*args, **kwargs)
    inner.__name__ = func.__name__
    return inner

def admin_required(func):
    @wraps(func)
    def inner(*args, **kwargs):
        if 'user_id' not in session:
            flash("Please login to continue")
            return redirect(url_for('login'))
        user = User.query.get(session['user_id'])
        if not user.is_admin:
            flash("You are not authorized to access this page")
            return redirect(url_for('index'))
        return func(*args, **kwargs)
    inner.__name__ = func.__name__
    return inner

@app.route('/')
@auth_required
def index():
    user = User.query.get(session['user_id'])
    if user.is_admin:
        return redirect(url_for('admin'))

    current_time = datetime.now()
    attempted_quiz_ids = {score.quiz_id for score in Scores.query.filter_by(user_id=user.id).all()}
    upcoming_quizzes = Quiz.query.filter(Quiz.date_of_quiz > current_time).all()
    available_quizzes = Quiz.query.filter(
        Quiz.date_of_quiz <= current_time,
        Quiz.id.notin_(attempted_quiz_ids)
    ).all()
    attempted_quizzes = Quiz.query.filter(Quiz.id.in_(attempted_quiz_ids)).all()

    quiz_question_counts = {}
    for quiz in available_quizzes + upcoming_quizzes + attempted_quizzes:
        quiz_question_counts[quiz.id] = Question.query.filter_by(quiz_id=quiz.id).count()

    return render_template(
        'index.html',
        available_quizzes=available_quizzes,
        upcoming_quizzes=upcoming_quizzes,
        attempted_quizzes=attempted_quizzes,
        user=user,
        quiz_question_counts=quiz_question_counts
    )


@app.route('/login')
def login():
    return render_template('login.html')

@app.route('/login', methods=['POST'])
def login_user():
    username = request.form['username']
    password = request.form['password']
    if not username or not password:
        flash("Please fill out all these fields")
        return redirect(url_for('login'))
    
    user = User.query.filter_by(username=username).first()
    if not user:
        flash("Username does not exist")
        return redirect(url_for('login'))
    
    if not check_password_hash(user.passhash, password):
        flash("Invalid password")
        return redirect(url_for('login'))
    
    session['user_id'] = user.id
    session['is_admin'] = user.is_admin
    if user.is_admin:
        return redirect(url_for('admin'))
    else:
        return redirect(url_for('index'))
    

@app.route('/register')
def register():
    return render_template('register.html')

@app.route('/register', methods=['POST'])
def register_user():
    name = request.form['name']
    username = request.form['username']
    password = request.form['password']
    confirm_password = request.form['confirm_password']
    if not username or not password or not confirm_password or not name:
        flash("Please fill out all these fields")
        return redirect(url_for('register'))
    
    if password != confirm_password:
        flash("Passwords do not match")
        return redirect(url_for('register'))
    
    user = User.query.filter_by(username=username).first()
    if user:
        flash("Username already exists")
        return redirect(url_for('register'))
    
    password_hash = generate_password_hash(password)
    
    new_user = User(username=username, passhash=password_hash, name=name)
    db.session.add(new_user)
    db.session.commit()
    return redirect(url_for('login'))

@app.route('/profile')
@auth_required
def profile():
    user = User.query.get(session['user_id'])
    return render_template('profile.html', user=user)

@app.route('/profile', methods=['POST'])
@auth_required
def profile_post():
    name = request.form['name']
    username = request.form['username']
    cpassword = request.form['cpassword']
    password = request.form['password']

    if not username or not cpassword or not password:
        flash("Please fill out all the required fields")
        return redirect(url_for('profile'))
    
    user = User.query.get(session['user_id'])
    if not check_password_hash(user.passhash, cpassword):
        flash("Current password is incorrect")
        return redirect(url_for('profile'))
    
    if username != user.username:
        new_username = User.query.filter_by(username=username).first()
        if new_username:
            flash("Username already exists")
            return redirect(url_for('profile'))
    
    new_password_hash = generate_password_hash(password)
    user.name = name
    user.username = username
    user.passhash = new_password_hash
    db.session.commit()
    flash("Profile updated successfully")
    return redirect(url_for('profile'))

@app.route('/admin/profile')
@admin_required
def admin_profile():
    user = User.query.get(session['user_id'])
    return render_template('profile.html', user=user)

@app.route('/admin/profile', methods=['POST'])
@admin_required
def admin_profile_post():
    name = request.form['name']
    username = request.form['username']
    cpassword = request.form['cpassword']
    password = request.form['password']

    if not username or not cpassword or not password:
        flash("Please fill out all the required fields")
        return redirect(url_for('admin_profile'))
    
    user = User.query.get(session['user_id'])
    if not check_password_hash(user.passhash, cpassword):
        flash("Current password is incorrect")
        return redirect(url_for('admin_profile'))
    
    if username != user.username:
        new_username = User.query.filter_by(username=username).first()
        if new_username:
            flash("Username already exists")
            return redirect(url_for('admin_profile'))
    
    new_password_hash = generate_password_hash(password)
    user.name = name
    user.username = username
    user.passhash = new_password_hash
    db.session.commit()
    flash("Profile updated successfully")
    return redirect(url_for('admin_profile'))


@app.route('/logout')
@auth_required
def logout():
    session.pop('user_id')
    flash("Logged out successfully")
    return redirect(url_for('login'))

@app.route('/admin/logout')
@admin_required
def admin_logout():
    session.pop('user_id')
    flash("Logged out successfully")
    return redirect(url_for('login'))


@app.route('/admin')
@admin_required
def admin():
    subjects = Subject.query.all()
    return render_template('admin.html', subjects=subjects)

@app.route('/admin/subject/add')
@admin_required
def add_subject():
    return render_template('subject/add.html')

@app.route('/admin/subject/add', methods=['POST'])
@admin_required
def add_subject_post():
    name = request.form['name']
    description = request.form['description']
    if not name:
        flash("Please fill out the subject name")
        return redirect(url_for('add_subject'))
    subject = Subject.query.filter_by(subject_name=name).first()
    if subject:
        flash("Subject already exists")
        return redirect(url_for('add_subject'))
    new_subject = Subject(subject_name=name, subject_description=description)
    db.session.add(new_subject)
    db.session.commit()
    flash("Subject added successfully")
    return redirect(url_for('admin'))

@app.route('/admin/chapter/add/<int:subject_id>')
@admin_required
def add_chapter(subject_id):
    subject = Subject.query.get(subject_id)
    if not subject:
        flash("Subject does not exist")
        return redirect(url_for('admin'))
    return render_template('chapter/add.html', subject=subject)

@app.route('/admin/chapter/add/<int:subject_id>', methods=['POST'])
@admin_required
def add_chapter_post(subject_id):
    name = request.form['name']
    description = request.form['description']
    if not name or not subject_id:
        flash("Please fill out the chapter name")
        return redirect(url_for('add_chapter', subject_id=subject_id))
    chapter = Chapter.query.filter_by(chapter_name=name, subject_id=subject_id).first()
    if chapter:
        flash("Chapter already exists")
        return redirect(url_for('add_chapter'))
    new_chapter = Chapter(chapter_name=name, chapter_description=description, subject_id=subject_id)
    db.session.add(new_chapter)
    db.session.commit()
    flash("Chapter added successfully")
    return redirect(url_for('admin'))

@app.route('/admin/chapter/<int:chapter_id>/edit')
@admin_required
def edit_chapter(chapter_id):
    chapter = Chapter.query.get(chapter_id)
    if not chapter:
        flash("Chapter does not exist")
        return redirect(url_for('admin'))
    return render_template('chapter/edit.html', chapter=chapter)

@app.route('/admin/chapter/<int:chapter_id>/edit', methods=['POST'])
@admin_required
def edit_chapter_post(chapter_id):
    chapter = Chapter.query.get(chapter_id)
    if not chapter:
        flash("Chapter does not exist")
        return redirect(url_for('admin'))
    name = request.form['name']
    description = request.form['description']
    if not name:
        flash("Please fill out the chapter name")
        return redirect(url_for('edit_chapter', id=id))
    chapter.chapter_name = name
    chapter.chapter_description = description
    db.session.commit()
    flash("Chapter updated successfully")
    return redirect(url_for('admin'))

@app.route('/admin/chapter/<int:chapter_id>/delete')
@admin_required
def delete_chapter(chapter_id):
    chapter = Chapter.query.get(chapter_id)
    if not chapter:
        flash("Chapter does not exist")
        return redirect(url_for('admin'))
    return render_template('chapter/delete.html', chapter=chapter)

@app.route('/admin/chapter/<int:chapter_id>/delete', methods=['POST'])
@admin_required
def delete_chapter_post(chapter_id):
    chapter = Chapter.query.get(chapter_id)
    if not chapter:
        flash("Chapter does not exist")
        return redirect(url_for('admin'))
    db.session.delete(chapter)
    db.session.commit()
    flash("Chapter deleted successfully")
    return redirect(url_for('admin'))

@app.route('/admin/subject/<int:id>/edit')
@admin_required
def edit_subject(id):
    subject = Subject.query.get(id)
    if not subject:
        flash("Subject does not exist")
        return redirect(url_for('admin'))
    return render_template('subject/edit.html', subject=subject)

@app.route('/admin/subject/<int:id>/edit', methods=['POST'])
@admin_required
def edit_subject_post(id):
    subject = Subject.query.get(id)
    if not subject:
        flash("Subject does not exist")
        return redirect(url_for('admin'))
    name = request.form['name']
    description = request.form['description']
    if not name:
        flash("Please fill out the subject name")
        return redirect(url_for('edit_subject', id=id))
    subject.subject_name = name
    subject.subject_description = description
    db.session.commit()
    flash("Subject updated successfully")
    return redirect(url_for('admin'))

@app.route('/admin/subject/<int:id>/delete')
@admin_required
def delete_subject(id):
    subject = Subject.query.get(id)
    if not subject:
        flash("Subject does not exist")
        return redirect(url_for('admin'))
    return render_template('subject/delete.html', subject=subject)

@app.route('/admin/subject/<int:id>/delete', methods=['POST'])
@admin_required
def delete_subject_post(id):
    subject = Subject.query.get(id)
    
    if not subject:
        return jsonify({'message': 'Subject not found!'}), 404
    
    for chapter in subject.chapters:
        for quiz in chapter.quizzes:
            db.session.query(Scores).filter_by(quiz_id=quiz.id).delete()
            db.session.delete(quiz)
    
    db.session.delete(subject)
    db.session.commit()
    return redirect(url_for('admin'))

@app.route('/admin/quiz')
@admin_required
def quiz():
    quizzes = Quiz.query.all()
    return render_template('quiz.html', quizzes=quizzes)

@app.route('/admin/quiz/add')
@admin_required
def add_quiz():
    chapters = Chapter.query.all()
    subjects = Subject.query.all()
    return render_template('quiz/add.html', chapters=chapters, subjects=subjects)

@app.route('/admin/quiz/add', methods=['POST'])
@admin_required
def add_quiz_post():
    name = request.form['name']
    remarks = request.form['remarks']
    chapter_id = request.form.get('chapter_id')
    date_of_quiz = request.form.get('date_of_quiz')
    time_duration = request.form.get('time_duration')
    if not name or not chapter_id or not date_of_quiz or not time_duration:
        flash("Please fill out the necessary details")
        return redirect(url_for('add_quiz'))
    quiz = Quiz.query.filter_by(quiz_name=name).first()
    if quiz:
        flash("Quiz already exists")
        return redirect(url_for('add_quiz'))
    try:
        date_of_quiz = datetime.strptime(date_of_quiz, "%Y-%m-%d")
        hours, minutes, seconds = map(int, time_duration.split(':'))
        time_duration = timedelta(hours=hours, minutes=minutes, seconds=seconds)
    except ValueError:
        flash("Invalid date or time format")
        return redirect(url_for('add_quiz'))
    new_quiz = Quiz(quiz_name=name, remarks=remarks, chapter_id=int(chapter_id), date_of_quiz=date_of_quiz, time_duration=time_duration)
    db.session.add(new_quiz)
    db.session.commit()
    flash("Quiz added successfully")
    return redirect(url_for('quiz'))

@app.route('/admin/quiz/<int:id>/edit')
@admin_required
def edit_quiz(id):
    quiz = Quiz.query.get(id)
    if not quiz:
        flash("Quiz does not exist")
        return redirect(url_for('quiz'))
    chapters = Chapter.query.all()
    subjects = Subject.query.all()
    return render_template('quiz/edit.html', quiz=quiz, chapters=chapters, subjects=subjects)  

@app.route('/admin/quiz/<int:id>/edit', methods=['POST'])
@admin_required
def edit_quiz_post(id):
    quiz = Quiz.query.get(id)
    if not quiz:
        flash("Quiz does not exist")
        return redirect(url_for('quiz'))
        
    name = request.form['name']
    remarks = request.form['remarks']
    subject_id = request.form.get('subject_id')
    chapter_id = request.form.get('chapter_id')
    date_of_quiz = request.form.get('date_of_quiz')
    time_duration = request.form.get('time_duration')
    
    if not name or not subject_id or not chapter_id or not date_of_quiz or not time_duration:
        flash("Please fill out all the necessary details")
        return redirect(url_for('edit_quiz', id=id))
    
    selected_chapter = Chapter.query.get(chapter_id)
    if not selected_chapter or int(selected_chapter.subject_id) != int(subject_id):
        flash("Selected chapter does not belong to the selected subject")
        return redirect(url_for('edit_quiz', id=id))
    
    quiz.quiz_name = name
    quiz.remarks = remarks
    quiz.chapter_id = int(chapter_id)
    
    try:
        parsed_date = datetime.strptime(date_of_quiz, "%Y-%m-%d")
        parts = time_duration.split(':')
        hours = int(parts[0])
        minutes = int(parts[1]) 
        seconds = int(parts[2])
        time_duration_obj = timedelta(hours=hours, minutes=minutes, seconds=seconds)
    except ValueError:
        flash("Invalid date or time format")
        return redirect(url_for('edit_quiz', id=id))
        
    quiz.date_of_quiz = parsed_date
    quiz.time_duration = time_duration_obj
    
    db.session.commit()
    flash("Quiz updated successfully")
    return redirect(url_for('quiz'))

@app.route('/admin/quiz/<int:id>/delete')
@admin_required
def delete_quiz(id):
    quiz = Quiz.query.get(id)
    if not quiz:
        flash("Quiz does not exist")
        return redirect(url_for('quiz'))
    return render_template('quiz/delete.html', quiz=quiz, chapters = Chapter.query.all(), subjects = Subject.query.all())

@app.route('/admin/quiz/<int:id>/delete', methods=['POST'])
@admin_required
def delete_quiz_post(id):
    quiz = Quiz.query.get(id)
    if not quiz:
        flash("Quiz does not exist")
        return redirect(url_for('quiz'))
    db.session.delete(quiz)
    db.session.commit()
    flash("Quiz deleted successfully")
    return redirect(url_for('quiz'))

@app.route('/admin/quiz/<int:id>/details')
@admin_required
def quiz_details(id):
    quiz = Quiz.query.get(id)
    chapters = Chapter.query.all()
    subjects = Subject.query.all()
    if not quiz:
        flash("Quiz does not exist")
        return redirect(url_for('quiz'))
    return render_template('quiz/details.html', quiz=quiz, chapters=chapters, subjects=subjects)

@app.route('/admin/question/add/<int:quiz_id>')
@admin_required
def add_question(quiz_id):
    quiz = Quiz.query.get(quiz_id)
    subject = Subject.query.get(quiz.chapter.subject_id)
    chapter = Chapter.query.get(quiz.chapter_id)
    if not quiz:
        flash("Quiz does not exist")
        return redirect(url_for('quiz'))
    last_question = Question.query.filter_by(quiz_id=quiz_id).order_by(Question.question_number.desc()).first()
    next_question_number = (last_question.question_number + 1) if last_question else 1

    return render_template('question/add.html', quiz=quiz, subject=subject, chapter=chapter, next_question_number=next_question_number)

@app.route('/admin/question/add/<int:quiz_id>', methods=['POST'])
@admin_required
def add_question_post(quiz_id):
    quiz = Quiz.query.get(quiz_id)
    if not quiz:
        flash("Quiz does not exist")
        return redirect(url_for('quiz'))
    question_number = request.form.get('question_number')
    question_title = request.form.get('question_title')
    question_statement = request.form.get('question_statement')
    option1 = request.form.get('option1')
    option2 = request.form.get('option2')
    option3 = request.form.get('option3')
    option4 = request.form.get('option4')
    correct_option = request.form.get('correct_option')
    if not question_number or not question_statement or not option1 or not option2 or not option3 or not option4 or not correct_option:
        flash("Please fill out all the fields")
        return redirect(url_for('add_question', quiz_id=quiz_id))
    question = Question.query.filter_by(question_number=question_number, quiz_id=quiz_id).first()
    if question:
        flash("Question already exists")
        return redirect(url_for('add_question', quiz_id=quiz_id))
    new_question = Question(question_number=question_number, question_title = question_title, question_statement=question_statement, option1=option1, option2=option2, option3=option3, option4=option4, correct_option=correct_option, quiz_id=quiz_id)
    db.session.add(new_question)
    db.session.commit()
    flash("Question added successfully")
    return redirect(url_for('quiz', id=quiz_id)) 

@app.route('/admin/question/<int:id>/edit')
@admin_required
def edit_question(id):
    question = Question.query.get(id)
    if not question:
        flash("Question does not exist")
        return redirect(url_for('quiz'))
    quiz = Quiz.query.get(question.quiz_id)
    subject = Subject.query.get(quiz.chapter.subject_id)
    chapter = Chapter.query.get(quiz.chapter_id)
    return render_template('question/edit.html', question=question, quiz=quiz, subject=subject, chapter=chapter)

@app.route('/admin/question/<int:id>/edit', methods=['POST'])
@admin_required
def edit_question_post(id):
    question = Question.query.get(id)
    if not question:
        flash("Question does not exist")
        return redirect(url_for('quiz'))
    question_number = request.form.get('question_number')
    question_title = request.form.get('question_title')
    question_statement = request.form.get('question_statement')
    option1 = request.form.get('option1')
    option2 = request.form.get('option2')
    option3 = request.form.get('option3')
    option4 = request.form.get('option4')
    correct_option = request.form.get('correct_option')
    if not question_number or not question_statement or not option1 or not option2 or not option3 or not option4 or not correct_option:
        flash("Please fill out all the fields")
        return redirect(url_for('edit_question', id=id))
    question.question_number = question_number
    question.question_title = question_title
    question.question_statement = question_statement
    question.option1 = option1
    question.option2 = option2
    question.option3 = option3
    question.option4 = option4
    question.correct_option = correct_option
    db.session.commit()
    flash("Question updated successfully")
    return redirect(url_for('quiz', id=question.quiz_id))

@app.route('/admin/question/<int:id>/delete')
@admin_required
def delete_question(id):
    question = Question.query.get(id)
    if not question:
        flash("Question does not exist")
        return redirect(url_for('quiz'))
    quiz_id = question.quiz_id
    quiz = Quiz.query.get(quiz_id)
    chapter = Chapter.query.get(quiz.chapter_id)
    subject = Subject.query.get(chapter.subject_id)
    return render_template('question/delete.html', question=question, quiz_id=quiz_id, subject=subject, chapter=chapter)

@app.route('/admin/question/<int:id>/delete', methods=['POST'])
@admin_required
def delete_question_post(id):
    question = Question.query.get(id)
    if not question:
        flash("Question does not exist")
        return redirect(url_for('quiz'))
    quiz_id = question.quiz_id
    db.session.delete(question)
    db.session.commit()
    flash("Question deleted successfully")
    return redirect(url_for('quiz', id=quiz_id))    

@app.route('/quiz/<int:id>')
@auth_required
def user_quiz(id):
    quiz = Quiz.query.get(id)
    if not quiz:
        flash("Quiz does not exist")
        return redirect(url_for('index'))
    subject = Subject.query.get(quiz.chapter.subject_id)
    chapter = Chapter.query.get(quiz.chapter_id)
    current_date = datetime.now()
    return render_template('quiz_user/view.html', quiz=quiz, subject=subject, chapter=chapter, current_date=current_date)

@app.route('/quiz/<int:id>/start')
@auth_required
def start_quiz(id):
    quiz = Quiz.query.get(id)
    if not quiz:
        flash("Quiz does not exist")
        return redirect(url_for('index'))
    questions = Question.query.filter_by(quiz_id=id).all()
    subject = Subject.query.get(quiz.chapter.subject_id)
    chapter = Chapter.query.get(quiz.chapter_id)
    quiz.time_duration = quiz.time_duration.total_seconds()
    return render_template('quiz_user/start.html', quiz=quiz, questions=questions, subject=subject, chapter=chapter)

@app.route('/quiz/<int:id>/submit', methods=['POST'])
@auth_required
def submit_quiz(id):
    quiz = Quiz.query.get_or_404(id)
    questions = Question.query.filter_by(quiz_id=id).all()
    user_id = session['user_id']

    user_answers_dict = {}
    score = 0

    for question in questions:
        user_choice = request.form.get(f"q{question.id}")
        user_answers_dict[str(question.id)] = user_choice
        
        if user_choice == question.correct_option:
            score += 1

    total_questions = len(questions)

    if not user_answers_dict:
        flash("Your answers were not captured. Please try again.", "danger")
        return redirect(url_for('quiz', id=id))

    new_score = Scores(
        user_id=user_id,
        quiz_id=id,
        total_scored=score,
        time_stamp_of_event=datetime.now(ist),
        user_answers=user_answers_dict
    )

    db.session.add(new_score)
    db.session.commit()

    flash(f"Quiz Submitted Successfully! You scored {score}/{total_questions}.", "success")
    return redirect(url_for('user_scores'))



@app.route('/scores')
@auth_required
def user_scores():
    user = User.query.get(session['user_id'])
    user_scores = Scores.query.filter_by(user_id=user.id).all()
    quizzes = {quiz.id: {"name": quiz.quiz_name, "total_score": len(quiz.questions)} for quiz in Quiz.query.filter(Quiz.id.in_([score.quiz_id for score in user_scores])).all()}

    return render_template('scores/score.html', user_scores=user_scores, quizzes=quizzes, user=user)


@app.route('/scores/<int:id>/details')
@auth_required
def score_details(id):
    user_id = session.get('user_id')
    score_entry = Scores.query.filter_by(id=id, user_id=user_id).first()

    if not score_entry:
        flash("You don't have access to this score.", "danger")
        return redirect(url_for('user_scores'))
    
    quiz_id = score_entry.quiz_id
    quiz = Quiz.query.get(quiz_id)
    total_questions = Question.query.filter_by(quiz_id=quiz_id).count()
    user_answers_dict = score_entry.user_answers if score_entry.user_answers else {}
    questions = Question.query.filter_by(quiz_id=quiz_id).all()

    user_answers = []
    for question in questions:
        user_answer = user_answers_dict.get(str(question.id), "Not Answered")
        correct_answer = question.correct_option
        user_answers.append({
            "question_text": question.question_statement,
            "user_answer": user_answer,
            "correct_answer": correct_answer,
            "is_correct": user_answer == correct_answer
        })

    return render_template('scores/quiz_details.html', 
                           score=score_entry, 
                           quiz=quiz, 
                           user_answers=user_answers, 
                           total_questions=total_questions)

@app.route('/summary')
@auth_required
def user_summary():
    user_id = session.get('user_id')

    if not user_id:
        return redirect(url_for('login'))

    user = User.query.get(user_id)
    if not user:
        return "User not found", 404

    subject_stats = db.session.query(
        Subject.subject_name,
        (func.sum(Scores.total_scored) * 100.0 / func.sum(
            db.session.query(func.count(Question.id)).filter(Question.quiz_id == Scores.quiz_id).as_scalar()
        )).label("avg_percentage")
    ).join(Chapter, Chapter.subject_id == Subject.id) \
    .join(Quiz, Quiz.chapter_id == Chapter.id) \
    .join(Scores, Scores.quiz_id == Quiz.id) \
    .filter(Scores.user_id == user_id) \
    .group_by(Subject.subject_name) \
    .all()

    subject_stats = [
        {"subject_name": s.subject_name, "avg_percentage": round(s.avg_percentage, 2) if s.avg_percentage else 0}
        for s in subject_stats
    ]

    quiz_attempts = db.session.query(
        func.strftime('%Y-%m', Scores.time_stamp_of_event).label("month"),
        func.count(Scores.id).label("attempts")
    ).filter(Scores.user_id == user_id) \
    .group_by("month") \
    .order_by("month") \
    .all()

    formatted_quiz_attempts = []
    for entry in quiz_attempts:
        if entry.month:
            formatted_date = datetime.strptime(entry.month, "%Y-%m").strftime("%B, %Y")
        else:
            formatted_date = "Unknown Date"
        formatted_quiz_attempts.append({"month": formatted_date, "attempts": entry.attempts})

    return render_template('summary/user_summary.html', subject_stats=subject_stats, quiz_attempts=formatted_quiz_attempts)

@app.route('/debug-session')
def debug_session():
    return jsonify(dict(session))

@app.route('/admin/summary')
@admin_required
def admin_summary():
    subjects = Subject.query.all()
    subject_labels = [subject.subject_name for subject in subjects]
    subject_stats = []

    for subject in subjects:
        quizzes = Quiz.query.join(Chapter).filter(Chapter.subject_id == subject.id).all()
        total_marks_per_user = {}

        for quiz in quizzes:
            total_marks = db.session.query(func.count(Question.id)) \
                                    .filter(Question.quiz_id == quiz.id) \
                                    .scalar() or 1
            
            quiz_scores = db.session.query(Scores.user_id, func.sum(Scores.total_scored)) \
                                    .filter(Scores.quiz_id == quiz.id) \
                                    .group_by(Scores.user_id) \
                                    .all()

            for user_id, total_scored in quiz_scores:
                if user_id not in total_marks_per_user:
                    total_marks_per_user[user_id] = {"scored": 0, "total": 0}

                total_marks_per_user[user_id]["scored"] += total_scored
                total_marks_per_user[user_id]["total"] += total_marks * db.session.query(func.count(Scores.id)).filter(Scores.quiz_id == quiz.id, Scores.user_id == user_id).scalar() or 1

        top_scorer = None
        top_percentage = 0
        total_percentage_sum = 0
        attempt_count = len(total_marks_per_user)

        for user_id, marks in total_marks_per_user.items():
            percentage = (marks["scored"] / marks["total"]) * 100 if marks["total"] > 0 else 0
            total_percentage_sum += percentage

            if percentage > top_percentage:
                top_percentage = percentage
                top_scorer = User.query.get(user_id)

        avg_percentage = total_percentage_sum / attempt_count if attempt_count > 0 else 0

        subject_stats.append({
            "subject_name": subject.subject_name,
            "top_scorer": top_scorer.name if top_scorer else "No attempts",
            "top_percentage": round(top_percentage, 2),
            "avg_percentage": round(avg_percentage, 2)
        })

    return render_template('summary/admin_summary.html', 
                           subject_stats=subject_stats,
                           subject_labels=subject_labels)

@app.route('/search/user')
@auth_required
def user_search():
    query = request.args.get('q', '').strip()

    if not query:
        return render_template('search_results.html', results=[], query=query)

    results = []
    subjects = Subject.query.filter(Subject.subject_name.ilike(f"%{query}%")).all()
    quizzes = Quiz.query.filter(Quiz.quiz_name.ilike(f"%{query}%")).all()

    results.extend([
        {"type": "Subject", "name": subject.subject_name, "id": subject.id} for subject in subjects
    ])
    results.extend([
        {"type": "Quiz", "name": quiz.quiz_name, "id": quiz.id} for quiz in quizzes
    ])

    return render_template('search/search_results.html', results=results, query=query)

@app.route('/quiz/<int:quiz_id>', methods=['GET'])
@auth_required
def view_quiz(quiz_id):
    quiz = Quiz.query.get_or_404(quiz_id)
    questions = Question.query.filter_by(quiz_id=quiz_id).all()
    subject = Subject.query.get(quiz.chapter.subject_id)
    chapter = Chapter.query.get(quiz.chapter_id)
    current_date = datetime.now()
    return render_template('quiz.html', quiz=quiz, questions=questions, subject=subject, chapter=chapter, current_date=current_date)

@app.route('/subject/<int:subject_id>', methods=['GET'])
@auth_required
def view_subject(subject_id):
    subject = Subject.query.get_or_404(subject_id)
    return render_template('search/subject_details.html', subject=subject)

@app.route('/admin/user/<int:user_id>')
@admin_required
def admin_view_user(user_id):
    user = User.query.get_or_404(user_id)
    user_scores = db.session.query(Scores).filter(Scores.user_id == user_id).all()
    total_quizzes = len(user_scores)
    highest_score = max((s.total_scored for s in user_scores), default=0)

    total_score_sum = 0
    total_marks_sum = 0
    quiz_attempts = []

    for s in user_scores:
        total_marks = db.session.query(func.count(Question.id)).filter(Question.quiz_id == s.quiz_id).scalar() or 1
        total_marks_sum += total_marks
        total_score_sum += s.total_scored

        quiz_attempts.append({
            "quiz_name": s.quiz.quiz_name,
            "subject_name": s.quiz.chapter.subject.subject_name,
            "score": s.total_scored,
            "total_marks": total_marks,
            "percentage": round((s.total_scored / total_marks) * 100, 2)
        })

    average_score = (total_score_sum / total_marks_sum * 100) if total_marks_sum > 0 else 0

    return render_template(
        'search/user_details.html',
        user=user,
        scores=quiz_attempts,
        total_quizzes=total_quizzes,
        average_score=round(average_score, 2),
        highest_score=highest_score
    )

@app.route('/admin/search')
@admin_required
def admin_search():
    query = request.args.get('q', '').strip()

    if not query:
        return render_template('search_results.html', results=[], query=query)

    results = []
    users = User.query.filter(User.name.ilike(f"%{query}%")).all()
    subjects = Subject.query.filter(Subject.subject_name.ilike(f"%{query}%")).all()
    quizzes = Quiz.query.filter(Quiz.quiz_name.ilike(f"%{query}%")).all()

    results.extend([
        {"type": "User", "name": user.name, "id": user.id} for user in users
    ])
    results.extend([
        {"type": "Subject", "name": subject.subject_name, "id": subject.id} for subject in subjects
    ])
    results.extend([
        {"type": "Quiz", "name": quiz.quiz_name, "id": quiz.id} for quiz in quizzes
    ])

    return render_template('search/search_results.html', results=results, query=query)