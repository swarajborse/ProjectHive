from flask_restful import Api, Resource
from app import app
from models import db, User, Subject, Chapter
from flask import request

api = Api(app)

class SubjectResource(Resource):
    def get(self):
        subjects = Subject.query.all()
        return {'subjects': 
                [{
                    'id': subject.id,
                    'name': subject.subject_name,
                    'description': subject.subject_description
                } for subject in subjects]}
                
    def post(self):
        data = request.get_json()
        subject_name = data.get('name')
        subject_description = data.get('description')
        
        existing_subject = Subject.query.filter_by(subject_name=subject_name).first()
        if existing_subject:
            return {'message': 'Subject already exists.'}, 400

        new_subject = Subject(subject_name=subject_name, subject_description=subject_description)
        db.session.add(new_subject)
        db.session.commit()

        return {'message': 'Subject created successfully!', 'id': new_subject.id}, 201


class ChapterResource(Resource):
    def get(self):
        chapters = Chapter.query.all()
        return {'chapters': 
                [{
                    'id': chapter.id,
                    'name': chapter.chapter_name,
                    'subject_id': chapter.subject_id
                } for chapter in chapters]}

    def post(self):
        data = request.get_json() 
        chapter_name = data.get('name')
        subject_id = data.get('subject_id')
        
        existing_chapter = Chapter.query.filter_by(chapter_name=chapter_name, subject_id=subject_id).first()
        if existing_chapter:
            return {'message': 'Chapter already exists under this subject.'}, 400
            
        new_chapter = Chapter(chapter_name=chapter_name, subject_id=subject_id)
        db.session.add(new_chapter)
        db.session.commit()

        return {'message': 'Chapter created successfully!', 'id': new_chapter.id}, 201


api.add_resource(SubjectResource, '/api/subject')
api.add_resource(ChapterResource, '/api/chapter')