# Post-installation

After installing the OS, we are going to proceed to install KDE Plasma plus other few extra bits that we may need.

Make sure to reboot the system if you haven't done it already, and check that all packages are updated.

```zsh
pacman -Syyuu
```

Now we will install all things we need.

```zsh
pacman -Sy xorg plasma kde -applications ttf-freefont firefox vlc gimp libreoffice htop flashplugin git wget
```
