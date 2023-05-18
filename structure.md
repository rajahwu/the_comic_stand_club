# The Comic Stand Club

Backend

```hash
app
├── __init__.py
├── __pycache__
│   ├── __init__.cpython-39.pyc
│   └── config.cpython-39.pyc
├── api
│   ├── __pycache__
│   │   ├── auth_routes.cpython-39.pyc
│   │   └── user_routes.cpython-39.pyc
│   ├── auth_routes.py
│   └── user_routes.py
├── config.py
├── dev.db
├── forms
│   ├── __init__.py
│   ├── __pycache__
│   │   ├── __init__.cpython-39.pyc
│   │   ├── login_form.cpython-39.pyc
│   │   └── signup_form.cpython-39.pyc
│   ├── create_club_form.py
│   ├── login_form.py
│   └── signup_form.py
├── models
│   ├── __init__.py
│   ├── __pycache__
│   │   ├── __init__.cpython-39.pyc
│   │   ├── club.cpython-39.pyc
│   │   ├── club_membership.cpython-39.pyc
│   │   ├── comment.cpython-39.pyc
│   │   ├── db.cpython-39.pyc
│   │   ├── forum.cpython-39.pyc
│   │   ├── forum_comment.cpython-39.pyc
│   │   ├── stand.cpython-39.pyc
│   │   └── user.cpython-39.pyc
│   ├── club.py
│   ├── club_membership.py
│   ├── comment.py
│   ├── db.py
│   ├── forum.py
│   ├── forum_comment.py
│   ├── stand.py
│   └── user.py
├── router
│   ├── __init__.py
│   ├── club.py
│   └── rss_feed.py
└── seeds
    ├── __init__.py
    ├── __pycache__
    │   ├── __init__.cpython-39.pyc
    │   ├── clubs.cpython-39.pyc
    │   └── users.cpython-39.pyc
    ├── clubs.py
    └── users.py

```

Front End

```bash
.
├── App.js
├── components
│   ├── CharacterCard
│   │   └── index.js
│   ├── CharacterCardImage
│   │   └── index.jsx
│   ├── FeedComponents
│   │   ├── CharacterFeed
│   │   │   └── index.jsx
│   │   ├── ClubFeed
│   │   │   └── index.jsx
│   │   ├── NewsFeed
│   │   │   └── index.jsx
│   │   └── index.js
│   ├── LoginFormModal
│   │   ├── LoginForm.css
│   │   └── index.js
│   ├── LoginFormPage
│   │   ├── LoginForm.css
│   │   └── index.js
│   ├── Navigation
│   │   ├── Navigation.module.css
│   │   ├── ProfileButton.js
│   │   └── index.js
│   ├── OpenModalButton
│   │   └── index.js
│   ├── SignupFormModal
│   │   ├── SignupForm.css
│   │   └── index.js
│   ├── SignupFormPage
│   │   ├── SignupForm.css
│   │   └── index.js
│   ├── auth
│   │   └── ProtectedRoute.js
│   └── index.js
├── context
│   ├── Modal.css
│   └── Modal.js
├── hooks
│   ├── index.js
│   └── useBouncer.js
├── index.css
├── index.js
├── pages
│   ├── ContentPage
│   │   └── index.jsx
│   ├── CreatePage
│   │   ├── CreatePage.module.css
│   │   └── index.jsx
│   ├── FeedPage
│   │   └── index.jsx
│   ├── SplashPage
│   │   ├── SplashPage.module.css
│   │   └── index.jsx
│   └── index.js
├── resources
│   └── marvel.js
├── store
│   ├── club.js
│   ├── index.js
│   └── session.js
└── utils
    ├── marvelAPI.js
    └── md5hash.js
```
