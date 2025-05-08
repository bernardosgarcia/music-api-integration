import subprocess
import sys

def install_package(package):
    subprocess.check_call([sys.executable, "-m", "pip", "install", package])

def main():
    try:
        import imageio_ffmpeg as ffmpeg
    except ImportError:
        print("Instalando imageio-ffmpeg...")
        install_package("imageio-ffmpeg")
        import imageio_ffmpeg as ffmpeg

    path = ffmpeg.get_ffmpeg_exe()
    print("\n✅ FFmpeg baixado com sucesso!")
    print(f"📂 Caminho para o ffmpeg.exe:\n{path}\n")
    print("👉 Use esse caminho com o yt-dlp:")
    print(f'yt-dlp --ffmpeg-location "{path}" [outros argumentos aqui]')

if __name__ == "__main__":
    main()