FROM node:8-alpine

# Install dependencies
RUN set -x \
 && apk update \
 && apk add --update curl bash nginx openssl \
 && apk upgrade \
 && rm -rf /var/cache/apk/*

 # Install Consul template
 # Releases at https://releases.hashicorp.com/consul-template/
 RUN set -ex \
     && export CONSUL_TEMPLATE_VERSION=0.19.0 \
     && export CONSUL_TEMPLATE_CHECKSUM=31dda6ebc7bd7712598c6ac0337ce8fd8c533229887bd58e825757af879c5f9f \
     && curl --retry 7 --fail -Lso /tmp/consul-template.zip "https://releases.hashicorp.com/consul-template/${CONSUL_TEMPLATE_VERSION}/consul-template_${CONSUL_TEMPLATE_VERSION}_linux_amd64.zip" \
     && echo "${CONSUL_TEMPLATE_CHECKSUM}  /tmp/consul-template.zip" | sha256sum -c \
     && unzip /tmp/consul-template.zip -d /usr/local/bin \
     && rm /tmp/consul-template.zip

# Install Consul agent
ENV CONSUL_VERSION 0.7.0
ENV CONSUL_CHECKSUM b350591af10d7d23514ebaa0565638539900cdb3aaa048f077217c4c46653dd8
RUN curl --retry 7 --fail -vo /tmp/consul.zip "https://releases.hashicorp.com/consul/${CONSUL_VERSION}/consul_${CONSUL_VERSION}_linux_amd64.zip" \
 && echo "${CONSUL_CHECKSUM}  /tmp/consul.zip" | sha256sum -c \
 && unzip /tmp/consul -d /usr/local/bin \
 && rm /tmp/consul.zip \
 && mkdir /config

# Install Containerpilot
ENV CONTAINERPILOT_VERSION 3.4.2
RUN export CONTAINERPILOT_CHECKSUM=5c99ae9ede01e8fcb9b027b5b3cb0cfd8c0b8b88 \
    && export archive=containerpilot-${CONTAINERPILOT_VERSION}.tar.gz \
    && curl -Lso /tmp/${archive} \
         "https://github.com/joyent/containerpilot/releases/download/${CONTAINERPILOT_VERSION}/${archive}" \
    && echo "${CONTAINERPILOT_CHECKSUM}  /tmp/${archive}" | sha1sum -c \
    && tar zxf /tmp/${archive} -C /bin \
    && rm /tmp/${archive}

ENV NODE_ENV=production

# Copy required files
COPY ./bin /bin
COPY ./etc/nginx.conf.tmpl /etc/nginx/nginx.conf.tmpl
COPY ./etc/containerpilot.json5 /etc/containerpilot.json5
ENV CONTAINERPILOT /etc/containerpilot.json5

RUN mkdir -p /opt/app/
WORKDIR /opt/app/
RUN npm pack joyent-cp-frontend
RUN tar -xzf joyent-cp-frontend*.tgz

CMD ["containerpilot"]
