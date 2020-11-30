#!/bin/bash

API="http://localhost:4741"
URL_PATH="/carts/:id"

curl "${API}${URL_PATH}/${ID}" \
  --include \
  --request PATCH \
  --header "Content-Type: application/json" \
 --header "Authorization: Bearer ${TOKEN}" \
 --data '{
   "cart": {
     "name": "'"${NAME}"'",
     "price": "'"${PRICE}"'",
     "description": "'"${DESCRIPTION}"'",
     "img": "'"${IMG}"'"
    }
  }'

echo
