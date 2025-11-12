## "Helping Hands" Social Event Management Platform

Helping Hands is a community-driven event management web application that allows users to create, manage, and join social events such as cleanups, donations,  plantation etc.
It helps people collaborate for a better society through organized participation and volunteer opportunities.

## Live Demo
Live Website: https://helping-hands-org.web.app/

## Repositories Link
Repository(Frontend): https://github.com/obaidullah-miazi-dev/Helping-Hands-Website  
Repository(Backend): https://github.com/obaidullah-miazi-dev/Helping-Hands-Server



## Features

User Authentication — Email/Password and Google login.  

Protected Routes — Only logged-in users can access private pages.  

Create & Manage Events — Users can create, update (and optionally delete) their own events.  

Join Events — Users can join social events and view their joined events.  

Dynamic Event Filtering — Search and filter events by event type and name (with backend support).  

Responsive Design — Fully optimized for desktop and mobile.  

Theme Toggle — Light/Dark mode switch using Tailwind + DaisyUI.  

Framer Motion Animations — Smooth transitions and interactive animations.  

Toast & Alert System — For success/error feedback.  


## Pages Overview
------------------  
## Home Page (Public)  

Beautiful banner section  

Features showcase  

Gallery section with static images  

Newsletter subscription (UI only)  



## Upcoming Events (Public)  

Displays all upcoming events (future dates only)  

Each event card shows title, image, date, type, and location  

“View Event” button opens event details  



## Event Details (Public)  

Shows full event information  

“Join Event” button available (requires login)  

  

## Create Event (Private)  

Users can create new events with validation  

Past dates not allowed  

Stores creator’s email for event ownership  

  

## Manage Events (Private)  

Shows all events created by the logged-in user  

Users can update or delete their own events  

## Joined Events (Private)  

Displays all events that the logged-in user has joined  

Events sorted by upcoming date  

## Authentication System  

Firebase Authentication (Email/Password + Google login)  

Password Rules:  

Minimum 6 characters  

Must contain uppercase & lowercase letters  

## Protected Routes:  

Create Event  

Manage Events  

Joined Events  


-------------

SweetAlert / Toast messages for login/register feedback  



## Technologies Used  

| Category | Tools/Library | 
|-----------|--------------------|
| Frontend | React.js, React Router DOM, Tailwind CSS, DaisyUI |
| Animation | Framer Motion |
| Date Picker | React DatePicker |
| Backend | Node.js, Express.js, MongoDB |
| Authentication | Firebase Authentication |
| Alert/Toast | SweetAlert2 |
| Hosting | Firebase Hosting (Frontend), Vercel (Backend) |
| Icons | Lucide React |
| Axios/Hook | Custom useAxios for API requests |





## Theme Customization  

Light/Dark theme toggle implemented using DaisyUI theme controller.  

Persists theme preference using local storage.  



## Future Improvements  

Add comment or feedback section in events.  

Implement notification system for joined users.  

Allow image uploads via Firebase Storage.  

Implement pagination on event lists.  
  

## Developed by Obaidullah Miazi

Email: obaidullahmiazi.dev@gmail.com  

LinkedIn: www.linkedin.com/in/obaidullah-miazi  

“Together we can make a difference — One event at a time.”  
