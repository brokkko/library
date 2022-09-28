#!/bin/bash
PATH=/home/user/.surrealdb:$PATH
surreal start --log trace --user root --pass root memory &
