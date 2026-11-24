# SonicRender

### Structured and Time-Grounded Rendering of Multi-Event Audio Scene Generation

[![arXiv](https://img.shields.io/badge/arXiv-2611.30241-b31b1b.svg)](https://arxiv.org/abs/2611.30241) [![Project Page](https://img.shields.io/badge/Project-Page-blue.svg)](https://caiyunrui.github.io/SonicRender/)

**Compose a scene. Keep its voices. Control its timing.**

SonicRender brings speech, music, sound effects, and ambience together in one coherent audio scene. **Temporal Audio Scene Graph (TASG)** specifies what happens, who produces each event, and when it occurs; **AbsTime** grounds those temporal instructions in the audio generation process.

<p align="center">
  <img src="figs/teaser.png" alt="SonicRender: from a scene request through TASG to a unified audio mixture" width="480">
</p>

Explore multi-speaker conversations, long-form scenes, Chinese dialects, English accents, and multilingual speech, alongside matched SceneMix comparisons and public benchmark examples.

This repository hosts the SonicRender audio demo. The gallery includes **46 scenes** spanning complex compositions, dialects and languages, model comparisons, and public benchmarks.

## Abstract

While unified audio generators can synthesize speech, music, and sound effects within a single model, producing a plausible mixture is only part of the challenge: a complex scene request also specifies which events occur, who produces them, and when they are heard. To satisfy these compositional constraints in a single generation pass, we present SonicRender, a unified multi-event audio renderer. Its Temporal Audio Scene Graph (TASG) binds persistent source identities to localized speech, music, ambience, and sound-effect events, together with their content, acoustic roles, relations, and timestamped windows. We further introduce AbsTime, which supplies the audio latent stream with absolute-frame coordinates and valid-canvas duration. Through joint text-audio attention and conditional flow matching, the renderer learns to realize structured, timed scenes as coherent mixtures. On the MMAG timestamp benchmark, SonicRender achieves speech/sound F1 scores of 0.79/0.60, exceeding the strongest reported scores in our comparison. On our SceneMix evaluation, it attains 85.4% all-event recall, 83.9% window-hit rate, and 95.7% speaker accuracy. Subjective study further demonstrates significant improvements over all five comparison systems in both perceived audio quality and scene realization. Results across speech, general audio, music, multi-event load, and temporal-grounding analyses establish precise, composition-aware audio rendering within a unified generator. Demo page: [https://caiyunrui.github.io/SonicRender](https://caiyunrui.github.io/SonicRender/).

## Citation

If you find SonicRender useful in your research, please consider citing our work:

```bibtex
@misc{cai2026sonicrender,
  title         = {{SonicRender}: Structured and Time-Grounded Rendering of Multi-Event Audio Scene Generation},
  author        = {Yunrui Cai and Xu Li and Yan Rong and Dingdong Wang and Yucheng Zhou and Xixin Wu and Chen Zhang and Zhiyong Wu and Helen Meng},
  year          = {2026},
  eprint        = {2611.30241},
  archivePrefix = {arXiv},
  primaryClass  = {cs.SD},
  url           = {https://arxiv.org/abs/2611.30241}
}
```
