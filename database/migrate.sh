. venv/bin/activate
cd src/

migrations_exists=$( ls | grep "migrations" | wc -l )

if [ $migrations_exists == '1' ]
then
  if [ "$1" == 'reset' ]
  then
    echo "Delete migrations folder"
    yes | rm -r migrations
    python migrate.py db init
  else
    echo "migrations folder already exist. Add reset argument to delete it and make a new."
  fi
else
  python migrate.py db init
fi

## En caso de error como: Can't locate revision identified by '5c8b3d598949'
## copiar el id que aparece, pegarlo en la siguiente linea, descomentarla y ejecutar de nuevo
#python migrate.py db revision --rev-id 5c8b3d598949
python migrate.py db migrate
python migrate.py db upgrade

cd ..
deactivate
echo "migration performed"