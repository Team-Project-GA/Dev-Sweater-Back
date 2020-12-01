#!/bin/bash

API="http://localhost:4741"
URL_PATH="/orders/:id"

curl "${API}${URL_PATH}/${ID}" \
  --include \
  --request PATCH \
  --header "Content-Type: application/json" \
 --header "Authorization: Bearer ${TOKEN}" \
 --data '{
   "order": {
     "totalPrice": "'"${totalPrice}"'",
     "name": "'"${NAME}"'",
     "price": "'"${PRICE}"'",
     "description": "'"${DESCRIPTION}"'",
     "img": "'"${IMG}"'"
    }
  }'

echo
