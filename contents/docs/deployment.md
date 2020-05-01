# Deployment

?> If you don't want to host PostHog yourself, you can [sign up for an account instead](https://app.posthog.com/signup) and let us do the hosting for you.

# One-line docker preview

```bash
docker run -t -i --rm --publish 8000:8000 -v postgres:/var/lib/postgresql posthog/posthog:preview
```

This image has everything you need to try out PostHog locally! It will set up a server on http://127.0.0.1:8000.

!> The preview image is not meant for production.

# Deploy to Heroku

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/posthog/posthog)

Heroku is the quickest way to get a production PostHog environment up-and-running.

We recommend getting at the very least a `hobby-dev` Postgres and Dyno for low volumes of events. If you run on the 'free' tier it will work, but there will be a big lag each time you visit the app if your site hasn't been visited for a while.

[Click here](/upgrading-PostHog) for instructions on upgrading PostHog on Heroku to the latest version.

# Docker

We have [three types of images](https://hub.docker.com/r/posthog/posthog):

 - `posthog/posthog:latest`, which builds straight of master
 - `posthog/posthog:preview`, which is used for the preview image
 - `posthog/posthog:release-[version number]`, so you can pin a specific version.

?> We recommend using `posthog/posthog:latest`, so you always have the latest features and security updates

## Using Docker Compose 

1. [Install Docker](https://docs.docker.com/installation/ubuntulinux/)
2. [Install Docker Compose](https://docs.docker.com/compose/install/)
3. Run the following:
```bash
sudo apt-get install git
git clone https://github.com/posthog/posthog.git
cd posthog
docker-compose up -d
```

If you run your Postgres database somewhere else (like RDS, or just a different server) you can set the DATABASE_URL property, and remove `services -> db` and `depends_on: - db` from your docker-compose file.

If you're running locally, make sure to add `DEBUG: 1` as an environment variable, otherwise you'll get stuck in an infinite loop of SSL redirects.

!> Getting a blank screen running locally? PostHog assumes you want to use SSL and will redirect you to `https://...`. To avoid this, set `DISABLE_SECURE_SSL_REDIRECT=1`

## Running behind a proxy?

If you're running PostHog behind a proxy, there are a few more things you need to do to make sure PostHog (specifically the toolbar, which runs on your own site) works.

Make sure you have the `IS_BEHIND_PROXY` environment variable set to true

### NGINX config

You need to make sure your proxy server is sending X-Forwarded-For headers. For NGINX, that config should look something like:

```nginx
    location / {
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header Host $http_host;
        proxy_redirect off;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_pass http://127.0.0.1:8000;
    }
```

### Infinite redirect

Some users have reported getting infinite redirects running behind a proxy. You can set the `DISABLE_SECURE_SSL_REDIRECT` variable to make PostHog run using http.

## Secret key

Secret keys are used to encrypt cookies, password reset emails [and other things](https://docs.djangoproject.com/en/3.0/ref/settings/#secret-key). To generate a secret key, run:

```bash
openssl rand -hex 32
```

# Helm Charts and Kubernetes

We maintain a [helm chart for PostHog](https://github.com/PostHog/charts/tree/master/charts/posthog).

To install the latest version:

```shell script
helm repo add posthog https://posthog.github.io/charts/
helm repo update
helm install posthog posthog/posthog
```

See the [README](https://github.com/PostHog/charts/blob/master/charts/posthog/README.md) or 
[`values.yaml`](https://github.com/PostHog/charts/blob/master/charts/posthog/values.yaml)
for configuration options.

# From source
1. Make sure you have Python >= 3.7 and pip installed
2. [Install Yarn](https://classic.yarnpkg.com/en/docs/install/#mac-stable)
3. Have a Postgres and Redis server running
4. Run the following:
```bash
git clone https://github.com/posthog/posthog.git
yarn build
pip install -r requirements.txt
export DATABASE_URL=''
export REDIS_URL=''
python manage.py runserver
python manage.py collectstatic
```
5. To start the server and worker, run
```bash
./bin/docker-server & ./bin/docker-worker
```
You might want to use something like Supervisor to keep this command running

# Restrict access by IP

You can restrict access to PostHog by IP by passing `ALLOWED_IP_BLOCKS`. This is a comma separated list, and can either be individual IP addresses or subnets. For example:

```bash
ALLOWED_IP_BLOCKS=192.168.0.0/31,127.0.0.0/25,128.0.0.1
```

If you try to access your PostHog instance with a different IP, you will get an error message.

This restriction does not apply to the endpoints used to send events, like `batch`, `capture` etc.

If you're behind a proxy, you need to either set trusted proxies
```bash
TRUSTED_PROXIES=ip1,ip2
```

Or you can implicitely trust all proxies.

```bash
TRUST_ALL_PROXIES=True
```

!> When using `TRUST_ALL_PROXIES`, make sure your proxy (like nginx) is setting X-Forwarded-For, like in the example above. If not, it would still be possible to spoof your IP address

?> If you're on Heroku, you are behind a proxy so you'll need to add `IS_BEHIND_PROXY=True`. Heroku automatically overrides X-Forwarded-For, so you can use `TRUST_ALL_PROXIES=True`.

# How much will running PostHog cost me?

## Heroku

Using a hobby-dev instance and hobby-dev postgres database ($14/month), you should be able to handle up to about 100k events/day, with about a 100 day history.

With the next step up, 2-3x hobby-dev instances and standard-0 postgres ($64/month), you should be able to handle about 1M/events/day with over a year's worth of history.

## AWS

If running costs are a concern, AWS is likely to be a cheaper option, especially if you can commit to buy reserved instances for a year. This does come at the cost of ease-of-deployment.

If you've deployed on AWS, let us know how and how much you're spending roughly so we can improve this guide. Submit a PR to the [docs repo](https://github.com/PostHog/docs) :-).


# SMTP credentials

If you want to be able to send password reset emails from your instance, you need to set SMPTP credentials as env variables:

```yaml
EMAIL_HOST: [smtp server]
EMAIL_PORT: 578
EMAIL_HOST_USER: [username]
EMAIL_HOST_PASSWORD: [password]
EMAIL_USE_TLS: false
EMAIL_USE_SSL: false
DEFAULT_FROM_EMAIL: tim@posthog.com
```