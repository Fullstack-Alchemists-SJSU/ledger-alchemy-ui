FROM node:20
RUN mkdir /home/ledger-alchemy-ui
ENV REACT_APP_GOOGLE_CLIENT_ID=316883755977-8erv4bu9k5v1p6o0che1gesctns69vuc.apps.googleusercontent.com
ENV REACT_APP_AUTH0_DOMAIN=dev-o0wlmqnftb0wbnzm.us.auth0.com
ENV REACT_APP_AUTH0_CLIENT_ID=e2RobRfjZoclO7r0Mn0Y0wo7vslcUE3J
ENV PORT=4000
COPY . /home/ledger-alchemy-ui
WORKDIR /home/ledger-alchemy-ui
RUN npm install
EXPOSE 4000
CMD ["npm", "start"]