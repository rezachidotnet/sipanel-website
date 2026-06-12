#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

OUT_DIR="public/videos"
TMP_DIR="${OUT_DIR}/.render-tmp"
VIDEO_OUT="${OUT_DIR}/featured-army-hospital-18s.mp4"
POSTER_OUT="${OUT_DIR}/featured-army-hospital-poster.jpg"
FONT_FILE="/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"

mkdir -p "$OUT_DIR" "$TMP_DIR"

FILTER_COMPLEX=$(cat <<'FILTER'
[0:v]trim=start=5.0:end=8.5,setpts=PTS-STARTPTS,scale=1920:1080:force_original_aspect_ratio=increase,crop=1920:1080,fps=30,trim=duration=3.5,setpts=PTS-STARTPTS,setsar=1,format=yuv420p,fade=t=in:st=0:d=0.55,fade=t=out:st=3.20:d=0.30[v0];
[1:v]trim=start=42.0:end=48.0,setpts=(7/12)*(PTS-STARTPTS),scale=1920:1080:force_original_aspect_ratio=increase,crop=1920:1080,fps=30,trim=duration=3.5,setpts=PTS-STARTPTS,setsar=1,format=yuv420p,fade=t=in:st=0:d=0.30,fade=t=out:st=3.20:d=0.30[v1];
[2:v]trim=start=8.0:end=15.0,setpts=0.5*(PTS-STARTPTS),scale=1920:1080:force_original_aspect_ratio=increase,crop=1920:1080,fps=30,trim=duration=3.5,setpts=PTS-STARTPTS,setsar=1,format=yuv420p,fade=t=in:st=0:d=0.30,fade=t=out:st=3.20:d=0.30[v2];
[3:v]trim=start=3.0:end=8.0,setpts=0.7*(PTS-STARTPTS),scale=1920:1080:force_original_aspect_ratio=increase,crop=1920:1080,fps=30,trim=duration=3.5,setpts=PTS-STARTPTS,setsar=1,format=yuv420p,fade=t=in:st=0:d=0.30,fade=t=out:st=3.20:d=0.30[v3];
[4:v]trim=start=118.0:end=123.0,setpts=0.8*(PTS-STARTPTS),scale=1920:1080:force_original_aspect_ratio=increase,crop=1920:1080,fps=30,trim=duration=4.0,setpts=PTS-STARTPTS,setsar=1,format=yuv420p,fade=t=in:st=0:d=0.30,fade=t=out:st=3.45:d=0.55[v4];
[v0][v1][v2][v3][v4]concat=n=5:v=1:a=0[base];
[base]
drawtext=fontfile=/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf:text='32-Bed Military Hospital':enable='between(t,0,3.499)':x=120:y=h-190:fontsize=68:fontcolor=white:shadowcolor=black@0.70:shadowx=4:shadowy=4,
drawtext=fontfile=/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf:text='Raz & Jargalan':enable='between(t,3.5,6.999)':x=120:y=h-190:fontsize=68:fontcolor=white:shadowcolor=black@0.70:shadowx=4:shadowy=4,
drawtext=fontfile=/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf:text='Full EPC Delivery':enable='between(t,7.0,10.499)':x=120:y=h-190:fontsize=68:fontcolor=white:shadowcolor=black@0.70:shadowx=4:shadowy=4,
drawtext=fontfile=/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf:text='Completed Hospital Exterior':enable='between(t,10.5,13.999)':x=120:y=h-190:fontsize=68:fontcolor=white:shadowcolor=black@0.70:shadowx=4:shadowy=4,
drawtext=fontfile=/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf:text='Completed in Less Than 50 Days':enable='between(t,14.0,18.0)':x=120:y=h-190:fontsize=68:fontcolor=white:shadowcolor=black@0.70:shadowx=4:shadowy=4
[vout]
FILTER
)

ffmpeg -hide_banner -y \
  -i raw-video/artesh.mp4 \
  -i raw-video/artesh.mp4 \
  -i raw-video/artesh2.mp4 \
  -i raw-video/video5877367439804598941.mp4 \
  -i raw-video/InShot_20211231_053539874.mp4 \
  -filter_complex "$FILTER_COMPLEX" \
  -map "[vout]" \
  -an \
  -c:v libx264 \
  -profile:v high \
  -level 4.1 \
  -pix_fmt yuv420p \
  -r 30 \
  -t 18 \
  -movflags +faststart \
  -preset slow \
  -crf 20 \
  "$TMP_DIR/featured-army-hospital-18s.mp4"

ffmpeg -hide_banner -loglevel error -y \
  -ss 5.5 \
  -i raw-video/video5877367439804598941.mp4 \
  -frames:v 1 \
  -vf "scale=1920:1080:force_original_aspect_ratio=increase,crop=1920:1080,setsar=1" \
  -q:v 2 \
  "$TMP_DIR/featured-army-hospital-poster.jpg"

mv "$TMP_DIR/featured-army-hospital-18s.mp4" "$VIDEO_OUT"
mv "$TMP_DIR/featured-army-hospital-poster.jpg" "$POSTER_OUT"
rmdir "$TMP_DIR" 2>/dev/null || true

echo "Rendered $VIDEO_OUT"
echo "Rendered $POSTER_OUT"
