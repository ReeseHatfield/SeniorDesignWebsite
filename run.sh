echo "Running Senior Design Webpage..."

# setup backend
cd backend

npm install
npm run dev & # kills stdout of backend. for testing, may wanna run this separate
cd ..


# setup frontend
cd frontend
npm install
npm run dev -- --host
