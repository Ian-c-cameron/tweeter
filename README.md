# Tweeter Project

Tweeter is a simple, single-page Twitter clone.

## Final Product

Desktop Mode: Taking full advantage of all that space!
!["Desktop Mode: Taking full advantage of all that space!"](https://github.com/Ian-c-cameron/tweeter/blob/master/docs/DeskTopMode.png?raw=true)

Tablet Mode: Looking good on large phones and tablets!
!["Tablet Mode: Looking good on large phones and tablets!"](https://github.com/Ian-c-cameron/tweeter/blob/master/docs/TabletMode.png?raw=true)

Smartphone Mode: Everything you need in a tiny package!
!["Smartphone Mode: Everything you need in a tiny package!"](https://github.com/Ian-c-cameron/tweeter/blob/master/docs/SmartPhoneMode.png?raw=true)


## Dependencies

- Body-parser
- Chance
- Express
- Node 5.10.x or above

## Getting Started

- Install all dependencies (using the `npm install` command).
- Run the server by executing `npm start`.
- To run in nodemon use `npm run local`.

## Implementation

This single page twitter clone is made to be adaptable for display on a wide range of platforms.  It includes three layouts to handle small, medium, and large screens, and will reorient itself to give the best possible user experience.

The tweet composition area slides out when needed, and hides away when the user just wants to browse.  When the user gets deep into reading the past postings, they can always return to the top with the click of a button to facilitate ease of access to post new tweets.

## Notes For Future Development

- styling is done in Sass, and must be compiled to css to take effect on the server. Stylesheets can be found in /public/styles.

- all client side scripts can be found in /public/scripts

## Prospective Future Improvements

The main area for improving the user experience would be to set up a system of registration, and account management.  There could also be provision for tracking conversations and responses.

On the server side, implementation of a stored database would be a great improvement.