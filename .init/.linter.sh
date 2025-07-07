#!/bin/bash
cd /home/kavia/workspace/code-generation/litgenre-explorer-108663-a6c4b3a3/genre_explorer_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

