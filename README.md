# Ticketing

## ❔ About
Microservices Ticketing Application to sell and buy tickets

## 🛠 Techs
The list of the main techs used in this project.

### Backend
- [Node.js](https://nodejs.org/en/)
- [Typescript](https://www.typescriptlang.org/)
- [Express](https://expressjs.com/)
- [NATS Streaming Server](https://docs.nats.io/nats-streaming-concepts/intro)
- [Mongo](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)
- [Redis](https://redis.io/)
- [JWT - Json Web Tokens](https://jwt.io/)
- [Stripe for Payments](https://stripe.com/)
- [Ingress Nginx](https://kubernetes.github.io/ingress-nginx/)
- [Docker](https://www.docker.com/)
- [Kubernetes](https://kubernetes.io/)

### Frontend
- [Next.js](https://nextjs.org/)
- [React](https://pt-br.reactjs.org/)

### CI/CD
- [Github](https://github.com/)
- [Github Actions](https://github.com/features/actions)

### Hosting
- [Digital Ocean](https://www.digitalocean.com/products/kubernetes/)


## ⚙ How to Install and Start

To install and start the ticketing app follow the steps below:

### Pre-Requirements Installations
- [Docker Desktop](https://docs.docker.com/get-docker/)
- Enable Kubernetes in the Docker Desktop
- [Install Ingress Nginx](https://kubernetes.github.io/ingress-nginx/deploy/)
- [Install Skaffold](https://skaffold.dev/docs/install/) Optional
- [Create a Stripe Account](https://dashboard.stripe.com/register) Optional
- Add tickets.com to your hosts file pointing to 127.0.0.1 (Mac /etc/hosts and Win c:\windows\system32\drivers\etc\hosts)

### Installation

Clone the Repository:

```
git clone https://github.com/abnersouza/ticketing.git
```

### Services

Open the cloned repository na navigate to the root folder

```
cd ./ticketing/
```

#### Kubernets Secrets
```bash
# Create the required secrets
> kubectl create secret generic jwt-secret --from-literal=JWT_KEY=123456
# If you have Stripe Account
> kubectl create secret generic stripe-secret --from-literal STRIPE_KEY=<REPLACE_HERE_YOUR_PRIVATE_STRIPE_KEY>
# If you don't have a Stripe Account
> kubectl create secret generic stripe-secret --from-literal STRIPE_KEY=123456
```

#### Skaffold
```bash
# If Skaffold is installed
> skaffold dev

# If Skaffold is not installed
> kubectl apply -f infra/k8s-dev
> kubectl apply -f infra/k8s
```

#### Open your browser
```
http://tickets.com
```

## 🥅 Plans

- Style the frontend
- Implement email service
- 

## 📜 License

This project is under MIT License

## Special Thanks
To Stephen Grider for the amazing [Microservices Course](https://www.udemy.com/course/microservices-with-node-js-and-react/)

Made with ❤️ by Abner Souza

