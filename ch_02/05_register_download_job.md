# cron

```bash
crontab -e
* * * * /bin/bash /home/devimal/Desktop/demo.sh
```

demo.sh
```bash
# Load nvm
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
nvm use 12

# now node works
node -e "console.log('hello')"
node --version

# npm works too!
npm --version
```

https://gist.github.com/simov/cdbebe2d65644279db1323042fcf7624

https://jhnyang.tistory.com/68
