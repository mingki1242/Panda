package com.example.panda.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QFavoriteEntity is a Querydsl query type for FavoriteEntity
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QFavoriteEntity extends EntityPathBase<FavoriteEntity> {

    private static final long serialVersionUID = 1203297445L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QFavoriteEntity favoriteEntity = new QFavoriteEntity("favoriteEntity");

    public final NumberPath<Integer> fid = createNumber("fid", Integer.class);

    public final QUserEntity userEntity;

    public final QWritingEntity writingEntity;

    public QFavoriteEntity(String variable) {
        this(FavoriteEntity.class, forVariable(variable), INITS);
    }

    public QFavoriteEntity(Path<? extends FavoriteEntity> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QFavoriteEntity(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QFavoriteEntity(PathMetadata metadata, PathInits inits) {
        this(FavoriteEntity.class, metadata, inits);
    }

    public QFavoriteEntity(Class<? extends FavoriteEntity> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.userEntity = inits.isInitialized("userEntity") ? new QUserEntity(forProperty("userEntity")) : null;
        this.writingEntity = inits.isInitialized("writingEntity") ? new QWritingEntity(forProperty("writingEntity"), inits.get("writingEntity")) : null;
    }

}

