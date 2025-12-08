# ------------------------------------
# Oh My Zsh 기본 설정
# ------------------------------------
export ZSH="$HOME/.oh-my-zsh"
ZSH_THEME="robbyrussell"

plugins=(
  git
  yarn
  zsh-autosuggestions
  zsh-syntax-highlighting
)

source $ZSH/oh-my-zsh.sh


# ------------------------------------
# Homebrew 설정
# ------------------------------------
eval "$(/opt/homebrew/bin/brew shellenv)"


# ------------------------------------
# NVM 설정
# ------------------------------------
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"


# ------------------------------------
# bun 설정
# ------------------------------------
export BUN_INSTALL="$HOME/.bun"
export PATH="$BUN_INSTALL/bin:$PATH"
[ -s "$HOME/.bun/_bun" ] && source "$HOME/.bun/_bun"


# ------------------------------------
# PATH 기본값 정리
# ------------------------------------
export PATH="$HOME/bin:/usr/local/bin:$PATH"
