FROM clamav/clamav:1.0.3_base

LABEL maintainer "The Infrastructure Company GmbH <info@servercow.de>"

RUN apk upgrade --no-cache \
  && apk add --update --no-cache \
  rsync \
  bind-tools \
  bash 

# init
COPY clamd.sh /clamd.sh
RUN chmod +x /sbin/tini

# healthcheck
COPY healthcheck.sh /healthcheck.sh
RUN chmod +x /healthcheck.sh
HEALTHCHECK --start-period=6m CMD "/healthcheck.sh"

ENTRYPOINT []
CMD ["/sbin/tini", "-g", "--", "/clamd.sh"]