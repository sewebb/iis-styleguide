# MailChimp Newsletter component

This component is specifically made to work together with the iis-mailchimp plugin. It consists of two forms, one static and one "slide-in" form. The slide-in form has a delay attribute on it controlled from Wordpress admin.

The two forms are never shown on screen at once, when the static form scrolls into view, the slide-in form is hidden if visible and the timer is cleared. If the static forms is once again out of viewport the timer restarts.

It the user clicks the slide-in form close button, a cookie is set and the slide-in form no longer slides into view. The cookie lasts 1 week. If the user is sent from email campaign with URL parameter ?noForm=true, the cookie is set show slide-in form won't show.
