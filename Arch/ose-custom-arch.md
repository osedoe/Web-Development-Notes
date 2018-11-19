# Arch linux custom installation

## Introduction

**Disclaimer:** This does not pretend to be by any means the perfect arch installation guide, but what it has worked for me after trying hard and failing even harder.

We will be installing the Arch Linux OS, GRUB, and KDE.

This guide is heavily based in [Henri's arch installation](https://paste.ubuntu.com/23956628/).

## Guide

### 1. Hello, I'm looking for the Nyan Cat | Internet conf

As obvious as it may sound, first we need to check that we have a working internet connection.
Hence, we'll do:

```terminal
# To enable the network interface
dhcpcd
# Ping our friend google
ping -c 4 8.8.8.8
```

I insist, *we HAVE to do:**:

```zsh
dhcpcd
ping -c 4 8.8.8.8
```

I don't want to see you crying later on when shit gets set on fire.

#### Extra resource that should not be needed

_If we need to stop the dhcpcd service, we will do:_

```terminal
systemctl stop dhcpcd@<TAB>
```

And see the Network configuration [here](https://wiki.archlinux.org/index.php/Network_configuration#Device_driver)

Ok, cool.
Now we should start partitioning the disk.
To check out partitions we do it with:

```zsh
lsblk
```

And to **start partitioning** we will do:

```zsh
cfdisk /dev/sda
```

and face our first boss.

### 2. Slice and dice that MF | Partitioning Disk

Before jumping here, I want you to think and rething your strategy. This is important.

I will always recommend 1G for the boot partition, more than enough.
As for RAM, follow this rules (not mine)...

| Amount of RAM in the system | Recommended swap space     | Recommended swap space if allowing for hibernation  |
|-----------------------------|----------------------------|-----------------------------------------------------|
| 2GB of RAM or less          | 2 times the amount of RAM  | 3 times the amount of RAM                           |
| 2GB to 8GB of RAM           | Equal to the amount of RAM | 2 times the amount of RAM                           |
| 8GB to 64GB of RAM          | At least 4 GB              | 1.5 times the amount of RAM                         |
| 64GB of RAM or more         | At least 4 GB              | Hibernation not recommended                         |

Now, the schema should end up something like this

| /DEV/SDA | SIZE                | MOUNT POINT |
|:--------:|:-------------------:|:-----------:|
| sda1     | 1G is enough        | /           |
| sda2     | 1GB (2G to be safe) | swap        |
| sda3     | remaining space     | /home       |

We will start facing the **Partition Dragon** with the `cfdisk /dev/sda` command utility, if you haven't done it already.

Now, let's see our options:

We will choose _dos_ in the prompt, or _gpt_ if our disk has more than 2T.

- First we will manage `/dev/sda1/`: In the utility, we will go to _FREE SPACE_ >_NEW_ and make it _1G_ big, _primary_, and _bootable_. We will also make sure the type says Linux on the screen.
- Now we will go for our SWAP partition `/dev/sda2/`: We will create this partition going to _NEW_ again, giving it _2G_, _primary_, and in _Type_ we will select _Linux swap / Solaris_.
- Lastly, for the `/dev/sda2`: We will select the remaining size, _PRIMARY_, _WRITE_ and _yes_.

Now we can quit the cfdisk utility.

### 3. Doing the homework | Formatting the partitions

We have faced our first big challenge. Go grab a beer, you deserve it. I used to be scared of partitioning my disk... well I'm still are. So, yes, be proud of yourself.

As it follows:

```zsh
# Format partitions
mkfs.ext4 /dev/sda1
mkfs.ext4 /dev/sda3

# Create and mount SWAP
mkswap /dev/sda2
swapon /dev/sda2
# If we needed it: swapoff /dev/sda2
```

We should create the main folders, that we are going to mount in the main partitions:

```zsh
# We don't need to create /mnt/var and /mnt/home anymore explicitly
mkdir /mnt/boot
mount /dev/sda1 /mnt/boot
mount /dev/sda3 /mnt
```

### 4. Updating packages for us

#### Method A

We are going to sync our packages through [Refactor](https://wiki.archlinux.org/index.php/Reflector) with the following commands:

```zsh
# Sync and refresh the master package database from the server defined in pacman.conf
pacman -Sy
# Install latest version of reflector which basically will sort our mirror list for us
pacman -S reflector
reflector --verbose -l 5 --sort rate --save /etc/pacman.d/mirrorlist
```

#### Method B

Another alternative, following the [ArchLinux wiki](https://wiki.archlinux.org/index.php/Installation_guide#Install_the_base_packages), says:

> The Packages to be installed must be downloaded from mirror servers, which are defined in /etc/pacman.d/mirrorlist. On the live system, all mirrors are enabled, and sorted by their synchronization status and speed at the time the installation image was created.
>
> The higher a mirror is placed in the list, the more priority it is given when downloading a package. You may want to edit the file accordingly, and move the geographically closest mirrors to the top of the list, although other criteria should be taken into account.
>
> This file will later be copied to the new system by pacstrap, so it is worth getting right.

### 5. Installing Arch linux packages

This is the heart of the installation. Here we will choose which packages are we going to install.

```zsh
# My recommendation
# In order: base system (base and base-devel), grub-bios (boot helper GRUB), and well, a network manager
pacstrap -i /mnt base base-devel grub-bios networkmanager
```

Now we are going to configure the boot partition through the `genfstab` command:

```zsh
# Config fstab
genfstab -U -p  /mnt >> /mnt/etc/fstab
# Config chroot
arch-chroot /mnt
```

### 6. Polishing the baby | Language, location, timezone and other stuff

Depending on our language, we will have to go to the file `/etc/locale.gen` and uncomment the desires languages. In my case, I'm uncommenting en_GB.UTF-8 and es_ES.UTF-8

```zsh
vi /etc/locale.gen
locale-gen
echo LANG=en_GB.UTF-8 > /etc/locale.conf
export LANG=en_GB.UTF-8
```

Let's do the timezone now:

```zsh
# Canary Islands option
ln -s /usr/share/zoneinfo/Atlantic/Canary > /etc/localtime
# Or mainland Spain
ln -s /usr/share/zoneinfo/Europe/Madrid > /etc/localtime
# The UK
ls -s /usr/share/zoneinfo/Europe/London > /etc/localtime
```

And the time itself:

```zsh
hwclock --systohc --utc
```

Now we will go to `/etc/pacman.conf` and uncomment the lines _[multilib]_ and _include = /etc/pacman.d/mirrorlist_.

```zsh
vi /etc/pacman.conf
pacman -Sy
```

Now the keyboard, in case you got it in Spanish:

```zsh
loadkeys es
# and making it persistent in vconsole.conf
KEYMAP=es
```

Now we will set the hostname and the network

```zsh
echo name-of-your-machine > /etc/hostname
ystemctl enable dhcpcd@enp0s3.service
systemctl enable dhcpcd.service
```

Set root password and create an user

```zsh
passwrd
pacman -S sudo bash-completion
useradd -m -g users -G wheel,storage,power -s /bin/bash osedg
passwd osedg
```

Allow the users in wheel group to be able to preformance administrative tasks with sudo:

```zsh
# Uncomment the line: %wheel ALL=(ALL)
EDITOR=nano visudo
```

Install and configure bootloader:

```zsh
# Let's create a config image of Linux
mkinitcpio -p linux
pacman -S grub os-prober
# Install GRUB
grub-install /dev/sda
grub-mkconfig -o /boot/grub/grub.cfg
```

Now we will finish it off

```zsh
exit
umount -R /mnt
reboot
```
